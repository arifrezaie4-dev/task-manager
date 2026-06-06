import { Body, Controller, Get, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/CreateTasks.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body)
  }
}
