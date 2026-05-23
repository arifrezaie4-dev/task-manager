import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "src/tasks/dto/create-users.dto";
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}
@Injectable()
export class UsersService {
  private users: User[] = [];
  private idSeq = 1
  register(dto: CreateUserDTO) {
    const userNameExists = this.users.find(u => u.username === dto.username);
    if (userNameExists) {
      throw new BadRequestException("User already exists!")
    }
    const emailExists = this.users.find(u => u.email === dto.email);
    if (emailExists) {
      throw new BadRequestException("Email already exists!")
    }
    const user: User = {
      id: this.idSeq++,
      username: dto.username,
      email: dto.email,
      password: dto.password
    }
    this.users.push(user);

    const {password, ...safeUser} = user;
    return {message: "the User created...", user: safeUser}
  }

}
