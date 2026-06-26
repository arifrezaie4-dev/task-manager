import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateTeamDto {
    @IsInt()
    userId!: number
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name!: string
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description? : string
}