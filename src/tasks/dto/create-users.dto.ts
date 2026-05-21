import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(5)
    password: string
}