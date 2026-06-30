import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-users.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login-user.dto";
@ApiTags('auth')
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}
  @Post("register")
  @ApiOperation({
    summary: 'Register a User',
  })
  register(@Body() body: CreateUserDTO) {
    return this.authService.register(body)
  }
  @UseGuards(AuthGuard('local'))
  @Post('login') 
  @ApiOperation({
    summary: 'Login a User',
  })
  @ApiBody({
    type: LoginDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
