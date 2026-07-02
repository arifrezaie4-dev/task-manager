import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
  @ApiProperty({
    example: "JohnDoe",
    description: "Username",
  })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username!: string;

  @IsEmail()
  @ApiProperty({
    example: "john@example.com",
    description: "User email address",
  })
  email!: string;
  @ApiProperty({
    example: "password123",
    description: "Minimum 6 characters",
  })
  @MinLength(6)
  password!: string;
}
