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
  UseGuards,
  Request
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/CreateTasks.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
@ApiTags('Tasks')
@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  @HttpCode(201)
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAllTasks(@Request() req) {
    
    return this.tasksService.getTasks(req.user.id);
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
