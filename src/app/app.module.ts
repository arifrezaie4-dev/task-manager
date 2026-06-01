import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
    imports: [TasksModule, UsersModule, PrismaModule],
    controllers: [AppController],
})
export class AppModule {}
