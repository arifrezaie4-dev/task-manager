import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { CreateTaskDto } from "./CreateTasks.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
 