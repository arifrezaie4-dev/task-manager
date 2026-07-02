import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/create-users.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { RoleGuard } from "src/auth/Guards/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorators/get-user.decorator";
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post("register")
  @ApiOperation({
    summary: "Register a new user",
  })
  @ApiCreatedResponse({
    description: "User created successfully.",
  })
  @ApiBadRequestResponse({
    description: "Validation failed.",
  })
  @ApiConflictResponse({
    description: "Email already exists.",
  })
  register(@Body() dto: CreateUserDTO) {
    return this.usersService.register(dto);
  }
  @Get()
  @UseGuards(AuthGuard("jwt"), RoleGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Retrieve all users",
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Users retrieved successfully.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  @ApiForbiddenResponse({
    description: "Access denied.",
  })
  findAll() {
    return this.usersService.findAll();
  }
  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({
    summary: "Retrieve user by ID",
  })
  @ApiOkResponse({
    description: "User retrieved successfully.",
  })
  @ApiNotFoundResponse({
    description: "User not found.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }
  @Put("me")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({
    summary: "Update current user's profile",
  })
  @ApiOkResponse({
    description: "User updated successfully.",
  })
  @ApiNotFoundResponse({
    description: "User not found.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  updateProfile(

    @GetUser("id") userId: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, body );
  }
  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"), RoleGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Delete user",
  })
  @ApiOkResponse({
    description: "User deleted successfully.",
  })
  @ApiNotFoundResponse({
    description: "User not found.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
