import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/http-exception.filter";

async function bootstrap() {
  const main = await NestFactory.create(AppModule);
  main.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  main.useGlobalFilters(new HttpExceptionFilter());
  main.enableCors({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true  
  })
  await main.listen(3000);
  console.log("The Server Is Running On Port 3000...");
}
bootstrap();
