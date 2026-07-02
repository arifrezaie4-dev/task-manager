import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-users.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "./dto/login-user.dto";
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("register")
  @ApiOperation({
    summary: "Register a new user",
  })
  @ApiCreatedResponse({
    description: "User registered successfully.",
  })
  @ApiConflictResponse({
    description: "Email already exists.",
  })
  @ApiBadRequestResponse({
    description: "Validation failed.",
  })
  register(@Body() body: CreateUserDTO) {
    return this.authService.register(body);
  }
  @UseGuards(AuthGuard("local"))
  @Post("login")
  @ApiOperation({
    summary: "Authenticate user and return JWT token",
  })
  @ApiOkResponse({
    description: "Login successful.",
  })
  @ApiBody({
    type: LoginDto,
  })
  @ApiUnauthorizedResponse({
    description: "Invalid email or password.",
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
