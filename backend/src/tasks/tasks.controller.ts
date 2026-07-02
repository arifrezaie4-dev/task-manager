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
  @UseGuards(AuthGuard("jwt"), RoleGuard)
  @Roles(Role.ADMIN)
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
  @ApiForbiddenResponse({
    description: "Access denied.",
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

  findTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.getTask(id);
  }
  @Put(":id")
  @UseGuards(AuthGuard("jwt"), RoleGuard)
  @Roles(Role.ADMIN)
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
  @ApiForbiddenResponse({
    description: "Access denied.",
  })
  editTask(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateTaskDto) {
    return this.tasksService.updateTask(id, body);
  }
  @Delete(":id")
  @UseGuards(AuthGuard("jwt"), RoleGuard)
  @Roles(Role.ADMIN)
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
  deleteTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
