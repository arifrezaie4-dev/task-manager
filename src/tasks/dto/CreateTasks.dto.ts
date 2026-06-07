import { IsString, IsOptional, IsInt, isBoolean, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title!: string;
    
  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  userId!: number;
  isDone!: boolean
}
