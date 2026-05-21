import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDTO } from "src/tasks/dto/create-users.dto";
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
  // @Post("register")
  // register(@Body() body: any) {
  //   console.log('BODY:', body);

  //   return body;
  // }
  // @Get("register")
  // getInfo() {
  //   return "I am Here"
  // }
}
