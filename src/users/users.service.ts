import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "src/tasks/dto/create-users.dto";

@Injectable()
export class UsersService {
  register(dto: CreateUserDTO) {
    console.log(dto);
    return {
      message: "the user created successfully.",
      dto,
    };
  }
}
