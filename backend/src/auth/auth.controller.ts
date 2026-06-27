import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-users.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
@ApiTags('auth')
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}
  @Post("register")
  register(@Body() body: CreateUserDTO) {
    return this.authService.register(body)
  }
  @UseGuards(AuthGuard('local'))
  @Post('login') 
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
