import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-users.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async register(dto: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      const user = await this.userService.register({
        ...dto,
        password: hashedPassword,
      });
      return user
    } catch (error) {
        throw error
    }
    // const existing = await this.prisma.user.findFirst({
    //   where: {
    //     OR: [{ email: dto.email }, { username: dto.username }],
    //   },
    // });
    // if (existing) {
    //   throw new BadRequestException("Email or Username already exists");
    // }
    // const user = await this.prisma.user.create({
    //   data: {
    //     username: dto.username,
    //     email: dto.email,
    //     password: dto.password,
    //   },
    //   select: {
    //     username: true,
    //     id: true,
    //     email: true,
    //     createdAt: true,
    //   },
    // });
    // return {
    //   success: true,
    //   message: "User created successfully",
    //   data: user
    // };
  }
}
