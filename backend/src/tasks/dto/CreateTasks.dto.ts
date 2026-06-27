import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Finish backend API",
    description: "Task title",
  })
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @ApiProperty({
    example: false,
    description: "Task completion status",
  })
  isDone?: boolean;
}
