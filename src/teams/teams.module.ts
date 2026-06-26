import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeamsController } from './teams.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [TeamsService],
    imports: [PrismaModule, AuthModule],
    controllers: [TeamsController]
})
export class TeamsModule {}
