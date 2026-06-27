import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateTeamDto } from "./dto/create-team.dto";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { UpdateTeamDto } from "./dto/update-team.dto";
@UseGuards(AuthGuard("jwt"))
@Controller("teams")
export class TeamsController {
  constructor(private teamsService: TeamsService) {}
  @Post()
  create(@Req() req, @Body() body: CreateTeamDto) {
    console.log("REQ USER:", req.user);
    return this.teamsService.createTeam(
      req.user.id,
      body.name,
      body.description,
    );
  }
  @Get("my-teams")
  getTeams(@GetUser("id") userId: number) {
    return this.teamsService.getUserTeams(userId);
  }
  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  getTeamById(
    @Param("id", ParseIntPipe) teamId: number,
    @GetUser("id") userId: number,
  ) {
    return this.teamsService.getTeamById(teamId, userId);
  }
  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  updateTeam(
    @Param("id", ParseIntPipe) teamId: number,
    @GetUser("id") userId: number,
    @Body() body: UpdateTeamDto,
  ) {
    return this.teamsService.updateTeam(teamId, userId, body);
  }
  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  deleteTeam(
    @Param("id", ParseIntPipe) teamId: number,
    @GetUser("id") userId: number,
  ) {
    return this.teamsService.deleteTeam(teamId, userId);
  }
}
