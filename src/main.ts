import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const main = await NestFactory.create(AppModule);
  main.useGlobalPipes(new ValidationPipe())
  await main.listen(3000);
  console.log("The Server Is Running On Port 3000...");
}
bootstrap();
