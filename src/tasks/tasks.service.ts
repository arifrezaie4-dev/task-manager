import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/CreateTasks.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async createTask(dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
      },
    });
    return {
      message: "Task Created",
      data: task,
    };
  }
  async getTasks() {
    const tasks = await this.prisma.task.findMany({
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
    return {
      message: "Tasks Found",
      data: tasks,
    };
  }
  async getTask(id: number) {
    const existing = await this.prisma.task.findFirst({
      where: {
        id,
      },
    });
    if (!existing) {
      throw new NotFoundException("The task with this id doesn't exist.");
    }
    const task = await this.prisma.task.findUnique({
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
    return {
      message: "Task Found",
      data: task,
    };
  }
  async updateTask(id: number, body: UpdateTaskDto) {
    const existing = await this.prisma.task.findFirst({
      where: {
        id,
      },
    });
    if (!existing) {
      throw new NotFoundException("The task with this id doesn't exist to edit.");
    }
    const task = await this.prisma.task.update({
      where: { id },
      data: {
        title: body.title,
        isDone: body.isDone,
      },
    });
    return {
      message: "Task Edited",
      data: task,
    };
  }
  async deleteTask(id: number) {
    const existing = await this.prisma.task.findFirst({
      where : {
        id
      }
    })
    if (!existing) {
      throw new NotFoundException(`The task with id: ${id}, Not Found`)
    }
    const task = await this.prisma.task.delete({
      where: {
        id,
      },
    });
    return {
      message: "Task Deleted Successfully.",
    };
  }
}
