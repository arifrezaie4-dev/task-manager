import { IsInt, IsString } from "class-validator"

export class CreateTeamDto {
    @IsInt()
    userId!: number
    @IsString()
    name!: string
    description? : string
}