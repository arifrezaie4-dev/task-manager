import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/http-exception.filter";

async function bootstrap() {
  const main = await NestFactory.create(AppModule);
  main.useGlobalPipes(new ValidationPipe())
  main.useGlobalFilters(new HttpExceptionFilter())
  await main.listen(3000);
  console.log("The Server Is Running On Port 3000...");
}
bootstrap();
