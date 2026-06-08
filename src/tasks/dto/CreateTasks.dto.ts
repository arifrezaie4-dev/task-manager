import { IsString, IsOptional, IsInt, IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  userId!: number;
  @IsOptional()
  isDone?: boolean;
}
