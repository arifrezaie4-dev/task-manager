import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/CreateTasks.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async createTask(dto: CreateTaskDto) {
    return await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
      },
    });
  }
  async getTasks() {
    return await this.prisma.task.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }
  async getTask(id: number) {
    return await this.prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }
}
