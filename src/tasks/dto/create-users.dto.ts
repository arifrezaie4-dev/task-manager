import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    username

    @IsEmail()
    email

    @MinLength(5)
    password
}