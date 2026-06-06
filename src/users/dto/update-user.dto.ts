import { IsEmail, IsString, IsOptional, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  password?: string;
}