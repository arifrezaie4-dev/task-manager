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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("Teams")
@Controller("teams")
export class TeamsController {
  constructor(private teamsService: TeamsService) {}
  @Post()
  @ApiCreatedResponse({
    description: "Team created successfully.",
  })
  @ApiBadRequestResponse({
    description: "Validation failed.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  @ApiOperation({
    summary: "Create a new team",
  })
  create(@GetUser("id") userId: number, @Body() body: CreateTeamDto) {
    return this.teamsService.createTeam(userId, body.name, body.description);
  }
  @Get("my-teams")
  @ApiOperation({
    summary: "Retrieve user's teams",
  })
  @ApiOkResponse({
    description: "Team retrieved successfully.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  getTeams(@GetUser("id") userId: number) {
    return this.teamsService.getUserTeams(userId);
  }
  @Get(":id")
  @ApiOperation({
    summary: "Retrieve team by ID",
  })
  @ApiOkResponse({
    description: "Team retrieved successfully.",
  })
  @ApiNotFoundResponse({
    description: "Team not found.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  getTeamById(
    @Param("id", ParseIntPipe) teamId: number,
    @GetUser("id") userId: number,
  ) {
    return this.teamsService.getTeamById(teamId, userId);
  }
  @Patch(":id")
  @ApiOperation({
    summary: "Update team",
  })
  @ApiOkResponse({
    description: "Team updated successfully.",
  })
  @ApiNotFoundResponse({
    description: "Team not found.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  updateTeam(
    @Param("id", ParseIntPipe) teamId: number,
    @GetUser("id") userId: number,
    @Body() body: UpdateTeamDto,
  ) {
    return this.teamsService.updateTeam(teamId, userId, body);
  }
  @Delete(":id")
  @ApiOperation({
    summary: "Delete team",
  })
  @ApiOkResponse({
    description: "Team deleted successfully.",
  })
  @ApiNotFoundResponse({
    description: "Team not found.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication required.",
  })
  deleteTeam(
    @Param("id", ParseIntPipe) teamId: number,
    @GetUser("id") userId: number,
  ) {
    return this.teamsService.deleteTeam(teamId, userId);
  }
}
