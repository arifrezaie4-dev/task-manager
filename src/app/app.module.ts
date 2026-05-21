import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TasksModule, UsersModule],
    controllers: [AppController],
})
export class AppModule {}
