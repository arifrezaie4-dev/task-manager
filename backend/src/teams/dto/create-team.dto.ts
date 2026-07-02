import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTeamDto {
  @ApiProperty({
    example: "Frontend team",
    description: "Team description",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: "Responsible for frontend development",
    description: "Team description",
    required: false,
  })
  description?: string;
}
