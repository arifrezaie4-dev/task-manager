import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/CreateTasks.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async createTask(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId
      }
    })
  }
}
