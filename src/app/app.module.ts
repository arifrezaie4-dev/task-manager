import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TasksModule, UsersModule, PrismaModule, AuthModule],
    controllers: [AppController],
})
export class AppModule {}
