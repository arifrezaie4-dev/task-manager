import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @ApiProperty({
    example: "JohnDoe",
    description: "Username",
  })
  @IsString()
  username!: string;

  @IsEmail()
  @ApiProperty({
    example: "john@example.com",
    description: "User email address",
  })
  email!: string;

  @MinLength(5)
  password!: string;
}
