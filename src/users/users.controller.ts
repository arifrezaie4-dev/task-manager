import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Put,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/create-users.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { RoleGuard } from "src/auth/Guards/roles.guard";
import { AuthGuard } from "@nestjs/passport";
interface Users {
  username: string;
  email: string;
  password: string;
}
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
@ApiTags('Users')
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post("register")
    @HttpCode(201)
  register(@Body() dto: CreateUserDTO) {
    return this.usersService.register(dto);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }
  @Put(":id")
  editUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, body)
  }
  @Delete(":id")
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id)
  }
}
