import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { AuthGuard } from "@nestjs/passport";
@UseGuards(AuthGuard('jwt'))
@Controller("teams")
export class TeamsController {
  constructor(private teamsService: TeamsService) {}
  @Post()
  create(@Req() req, @Body() body: { name: string; description?: string }) {
    console.log('REQ USER:', req.user);
    return this.teamsService.createTeam(
      req.user.id,
      body.name,
      body.description,
    );
  }
  @Get("my-teams")
  getTeams(@Req() req) {
    return this.teamsService.getUserTeams(req.user.id);
  }
}
