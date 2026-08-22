import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "src/users/dto/create-users.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async register(dto: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });
    if (existing) {
      throw new BadRequestException("Email or Username already exists");
    }
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        id: true,
        email: true,
        createdAt: true,
      },
    });
    return {
      success: true,
      message: "User created successfully",
      data: user,
    };
  }
  async findAll() {
    const user = await this.prisma.user.findMany({
      select: {
        username: true,
        id: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return {
      success: true,
      message: "Users Found successfully.",
      data: user,
    };
  }
  async getById(id: number) {
    const existing = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!existing) {
      throw new NotFoundException("The user with this id doesn't exist.");
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        username: true,
        id: true,
        role: true,
        email: true,
        createdAt: true,
      },
    });
    return {
      success: true,
      message: "User Found successfully",
      data: user,
    };
  }
  async updateUser(userId: number, body: UpdateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existing) {
      throw new NotFoundException(
        "The user with this id doesn't exist to edit.",
      );
    }

    const data: UpdateUserDto = {};

    if (body.username) {
      data.username = body.username;
    }

    if (body.password) {
      data.password = await bcrypt.hash(body.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    const { password, ...safeUser } = user;

    return {
      success: true,
      message: "User updated successfully",
      data: safeUser,
    };
  }
  async deleteUser(id: number) {
    const existing = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!existing) {
      throw new NotFoundException(`The User with Id ${id} Not Found!`);
    }
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: "User deleted successfully",
    };
  }
  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException("user not found.")
    }
    const isPasswordValid = await bcrypt.compare(
      currentPassword, 
      user.password
    )
    if (!isPasswordValid) {
      throw new BadRequestException("current password is incorrect.")
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPassword
      }
    })
    return {
      success: true,
      message: "Password changed successfully."
    }
  }
}
