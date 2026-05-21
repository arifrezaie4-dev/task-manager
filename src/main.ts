import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const post = await NestFactory.create(AppModule);
  await post.listen(3000);
  console.log("The Server Is Running On Port 3000...");
}
bootstrap();
