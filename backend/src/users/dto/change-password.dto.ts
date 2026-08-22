import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({
    example: "JohnDoe@gmail.com",
    description: "current password",
  })
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @ApiProperty({
    example: "JohnDoeNew@gmail.com",
    description: "new password",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword!: string;
}
