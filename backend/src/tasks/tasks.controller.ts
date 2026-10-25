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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
@ApiTags("Tasks")
@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: "Task created successfully.",
  })
  @ApiBadRequestResponse({
    description: "Validation failed.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  @ApiOperation({
    summary: "Creates a new task",
  })
  createTask(@Body() body: CreateTaskDto, @Request() req) {
    return this.tasksService.createTask(body, req.user.id);
  }
  @Get()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Retrieve all tasks",
  })
  @ApiOkResponse({
    description: "Tasks retrieved successfully.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  findAllTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.id);
  }
  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({
    summary: "Retrieve task by ID",
  })
  @ApiOkResponse({
    description: "Task retrieved successfully.",
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  @ApiForbiddenResponse({
    description: "Access denied.",
  })
  @ApiOkResponse({
    description: "Task retrieved successfully.",
  })
  @ApiNotFoundResponse({
    description: "Task with this id does not exist!",
  })

  findTask(@Param("id", ParseIntPipe) id: number, @Request() req) {
    return this.tasksService.getTask(id, req.user.id);
  }
  @Put(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update task",
  })
  @ApiOkResponse({
    description: "Task updated successfully.",
  })
  @ApiNotFoundResponse({
    description: "Task with this id does not exist!",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  editTask(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateTaskDto, @Request() req) {
    return this.tasksService.updateTask(id, body, req.user.id);
  }
  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Delete task",
  })
  @ApiOkResponse({
    description: "Task deleted successfully.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  @ApiForbiddenResponse({
    description: "Access denied.",
  })
  @ApiNotFoundResponse({
    description: "Task with this id does not exist!",
  })
  deleteTask(@Param("id", ParseIntPipe) id: number, @Request() req) {
    return this.tasksService.deleteTask(id, req.user.id);
  }
}
