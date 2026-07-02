import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { Role, TeamRole } from "@prisma/client";
import { AddMemberDto } from "./dto/add-member.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  async createTeam(userId: number, name: string, description?: string) {
    const existing = await this.prisma.team.findFirst({
      where: {
        name,
      },
    });
    if (existing) {
      throw new BadRequestException("The team already exists")
    }
    const team = await this.prisma.team.create({
      data: {
        name: name,
        description: description,
        members: {
          create: {
            userId: userId,
            role: TeamRole.OWNER,
          },
        },
      },
    });
    return {
      success: true,
      message: "Team created successfully",
      data: team,
    };
  }
  async addMember(dto: AddMemberDto, role: TeamRole) {
    const admin = await this.prisma.teamMember.findFirst({
      where: {
        teamId: dto.teamId,
        userId: dto.adminId,
        role: { in: [TeamRole.OWNER, TeamRole.ADMIN] },
      },
    });
    if (!admin) {
      throw new ForbiddenException("Only Owner or Admin can add members.");
    }
    return this.prisma.teamMember.create({
      data: {
        teamId: dto.teamId,
        userId: dto.targetUserId,
        role,
      },
    });
  }
  async getUserTeams(userId: number) {
    return await this.prisma.team.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                email: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }
  async getTeamById(teamId: number, userId: number) {
    const team = await this.prisma.team.findFirst({
      where: {
        id: teamId,
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
    if (!team) {
      throw new NotFoundException("Team not found or access denied");
    }
    return team;
  }
  async updateTeam(teamId: number, userId: number, dto: UpdateTeamDto) {
    const ownerShip = await this.prisma.teamMember.findFirst({
      where: {
        teamId,
        userId,
        role: TeamRole.OWNER,
      },
    });
    if (!ownerShip) {
      throw new ForbiddenException("Only owner can update this team");
    }
    return await this.prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }
  async deleteTeam(teamId: number, userId: number) {
    const ownerShip = await this.prisma.teamMember.findFirst({
      where: {
        teamId,
        userId,
        role: TeamRole.OWNER,
      },
    });
    if (!ownerShip) {
      throw new ForbiddenException("Only owner can delete this team");
    }
    await this.prisma.team.delete({
      where: { id: teamId },
    });
    return { message: "team deleted successfully." };
  }
}
