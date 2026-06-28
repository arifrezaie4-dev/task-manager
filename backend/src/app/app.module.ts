import { Module } from "@nestjs/common";
import { TasksModule } from "src/tasks/tasks.module";
import { UsersModule } from "src/users/users.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { TeamsModule } from "src/teams/teams.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TasksModule,
    UsersModule,
    PrismaModule,
    AuthModule,
    TeamsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}
