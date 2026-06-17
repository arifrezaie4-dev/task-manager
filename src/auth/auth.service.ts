import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-users.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,private jwtService: JwtService) {}
  async register(dto: CreateUserDTO) {
    try {
      const user = await this.userService.register(dto)
      return user
    } catch (error) {
        throw error
    }
  }
async validateUser(email: string, password: string) {
  const user = await this.userService.findOneByEmail(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    const {password, ...result} = user
    return result
  }
  return null
}
async login(user: any) {
  const payload = { email: user.email, sub: user.id };
  return {
    access_token: this.jwtService.sign(payload), // تولید توکن نهایی
  };
}
}
