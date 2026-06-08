import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "src/users/dto/create-users.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async register(dto: CreateUserDTO) {
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
        password: dto.password,
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
      data: user
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
      data: user
    };
  }
  async getById(id: number) {
        const existing = await this.prisma.user.findFirst({
          where : {
            id
          }
        })
        if (!existing) {
          throw new NotFoundException("The user with this id doesn't exist.")
        }
    const user =await this.prisma.user.findUnique({
      where: {
        id,
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
      message: "User Found successfully",
      data: user
    };
  }
  async updateUser(id: number, body: UpdateUserDto) {
    const existing = await this.prisma.user.findFirst({
      where : {
        id
      }
    })
    if (!existing) {
      throw new NotFoundException("The user with this id doesn't exist to edit.")
    }
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        username: body.username,
        password: body.password,
      },
    });
    return {
      success: true,
      message: "User Updated successfully",
      data: user
    }
  }
  async deleteUser(id: number) {
    const existing = await this.prisma.user.findFirst({
      where : {
        id
      }
    })
    if (!existing) {
      throw new NotFoundException(`The User with Id ${id} Not Found!`)
    }
    const user =  await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: "User deleted successfully",
    }
  }
}
