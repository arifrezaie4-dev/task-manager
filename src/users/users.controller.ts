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
} from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/create-users.dto";
import { UsersService } from "./users.service";
interface Users {
  username: string;
  email: string;
  password: string;
}
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post("register")
  register(@Body() dto: CreateUserDTO) {
    return this.usersService.register(dto);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(":id")
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id)
  }

}
