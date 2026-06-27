import { Controller, Get } from "@nestjs/common";

@Controller("app")
export class AppController {
  @Get() 
  getFromPost() {
    return "Hello World"
  }
}
