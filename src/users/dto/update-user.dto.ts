import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsString, IsOptional, MinLength } from "class-validator";
import { CreateTaskDto } from "src/tasks/dto/CreateTasks.dto";
import { CreateUserDTO } from "./create-users.dto";

export class UpdateUserDto extends PartialType(CreateUserDTO) {}
