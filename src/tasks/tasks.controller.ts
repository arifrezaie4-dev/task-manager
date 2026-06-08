import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/CreateTasks.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  @HttpCode(201)
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }
  @Get()
  findAllTasks() {
    return this.tasksService.getTasks();
  }
  @Get(":id")
  findTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.getTask(id);
  }
  @Put(":id")
  editTask(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, body)
  }
  @Delete(":id")
  deleteTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id)
  }
}
