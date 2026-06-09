import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/CreateTasks.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async createTask(dto: CreateTaskDto) {
    const existing = await this.prisma.task.findFirst({
      where: {
        title: dto.title
      }
    })

    if(existing) {
      throw new BadRequestException("the task with this title already exists.")
    }

    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
      },
    });
    return {
      success: true,
      message: "Task Created successfully",
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
      success: true,
      message: "Tasks Found successfully",
      data: tasks,
    };
  }
  async getTask(id: number) {
    const existing = await this.prisma.task.findUnique({
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
      success: true,
      message: "Task Found successfully",
      data: task,
    };
  }
  async updateTask(id: number, body: UpdateTaskDto) {
    const existing = await this.prisma.task.findUnique({
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
      success: true,
      message: "Task Updated successfully",
      data: task,
    };
  }
  async deleteTask(id: number) {
    const existing = await this.prisma.task.findUnique({
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
      success: true,
      message: "Task Deleted Successfully.",
    };
  }
}
