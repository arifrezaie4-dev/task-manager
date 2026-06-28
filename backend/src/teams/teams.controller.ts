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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
@UseGuards(AuthGuard("jwt"))
@ApiTags('Teams')
@Controller("teams")
export class TeamsController {
  constructor(private teamsService: TeamsService) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Team created successfully',
  })
    @ApiOperation({
      summary: 'Creates a team',
    })
  create(@Req() req, @Body() body: CreateTeamDto) {
    console.log("REQ USER:", req.user);
    return this.teamsService.createTeam(
      req.user.id,
      body.name,
      body.description,
    );
  }
  @Get("my-teams")
  @ApiOperation({
    summary: 'Finds teams',
  })
  @ApiBearerAuth()
  getTeams(@GetUser("id") userId: number) {
    return this.teamsService.getUserTeams(userId);
  }
  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Finds a team by user Id',
  })
  getTeamById(
    @Param("id", ParseIntPipe) teamId: number,
    @GetUser("id") userId: number,
  ) {
    return this.teamsService.getTeamById(teamId, userId);
  }
  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'updates a team',
  })
  updateTeam(
    @Param("id", ParseIntPipe) teamId: number,
    @GetUser("id") userId: number,
    @Body() body: UpdateTeamDto,
  ) {
    return this.teamsService.updateTeam(teamId, userId, body);
  }
  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'deletes a team',
  })
  deleteTeam(
    @Param("id", ParseIntPipe) teamId: number,
    @GetUser("id") userId: number,
  ) {
    return this.teamsService.deleteTeam(teamId, userId);
  }
}
