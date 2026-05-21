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
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller("users")
export class UsersController {
  @Post('register')
  register(@Body(new ValidationPipe()) body: CreateUserDTO) {
    console.log(body);

    return {
      message: "The User Created Successfully",
      body
    }
    
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
