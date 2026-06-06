import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/CreateTasks.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body)
  }
  @Get()
  findAllTasks() {
    return this.tasksService.getTasks();
  }
  @Get(":id")
  findTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.getTask(id)
  } 

}
