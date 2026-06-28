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
  Request,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/CreateTasks.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "src/auth/Guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/roles.enum";
@ApiTags("Tasks")
@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: "Task created successfully",
  })
  @ApiOperation({
    summary: "creates a task",
  })
  createTask(@Body() body: CreateTaskDto, @Request() req) {
    return this.tasksService.createTask(body, req.user.id);
  }
  @Get()
  @UseGuards(AuthGuard("jwt"), RoleGuard)
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "finds all tasks",
  })
  findAllTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.id);
  }
  @Get(":id")
  @ApiOperation({
    summary: "finds a task",
  })
  findTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.getTask(id);
  }
  @Put(":id")
  @ApiOperation({
    summary: "updates a task",
  })
  editTask(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateTaskDto) {
    return this.tasksService.updateTask(id, body);
  }
  @Delete(":id")
  @ApiOperation({
    summary: "deletes a task",
  })
  deleteTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
