import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { Role, TeamRole } from "@prisma/client";
import { AddMemberDto } from "./dto/add-member.dto";

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  async createTeam(userId: number, name: string, description?: string) {
    return await this.prisma.team.create({
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
}
