import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDTO } from "src/tasks/dto/create-users.dto";
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
    return this.prisma.user.create({
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
  }
  async findAll() {
    return this.prisma.user.findMany({
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
  }
  async getById(id: number) {
    return this.prisma.user.findUnique({
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
  }
}
