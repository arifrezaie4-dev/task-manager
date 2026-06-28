import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/http-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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
  const config = new DocumentBuilder()
  .setTitle('TaskFlow API')
  .setDescription('REST API for TaskFlow Team Task Manager')
  .setVersion('1.0.0')
  .build();

const document = SwaggerModule.createDocument(main, config);

SwaggerModule.setup('api', main, document);
  await main.listen(3000);
  console.log("The Server Is Running On Port 3000...");
}
bootstrap();
