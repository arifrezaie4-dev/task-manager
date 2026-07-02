import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, IsNotEmpty, IsBoolean } from "class-validator";

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
  @ApiProperty({
    example: "Complete Swagger documentation",
    description: "Detailed task description",
    required: false,
  })
  description?: string;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: "Whether the task has been completed",
    required: false,
  })
  isDone?: boolean;
}
