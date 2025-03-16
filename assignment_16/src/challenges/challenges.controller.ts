import { Controller, Get, Post, Delete, Param, Body, UsePipes, ValidationPipe, UseGuards, UnauthorizedException, Patch } from "@nestjs/common";
import { ChallengesService } from "./challenges.service";
import { CreateChallengeDto } from "./dto/create-challenge.dto"; // DTOs werden hier importiert, um sie unten...
import { UpdateChallengeDto } from "./dto/update-challenge.dto";
import { Roles } from "../auth/roles.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthenticatedUser } from "../auth/authenticated-user.decorator";


@Controller("challenges") // Basis-Route: Alle Routen starten mit /challenges
@UseGuards(JwtAuthGuard) // Schützt alle Routen in diesem Controller/ nur für auth. user
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @Roles("manager") // Nur Manager dürfen diese Route aufrufen
  @UsePipes(new ValidationPipe())
  async createChallenge(@Body() challengeData: CreateChallengeDto, @AuthenticatedUser() user) { // ... zu aktivieren
    if (!user || !user.id) {
      throw new UnauthorizedException("Manager ID missing from token")
    }

    return await this.challengesService.createChallenge(challengeData, user.id); // User-ID weitergeben
  }

  @Patch(":id")
  @Roles("manager") // Nur Manager dürfen diese Route aufrufen
  @UsePipes(new ValidationPipe())
  async updateChallenge(@Param("id") id: string, @Body() updateData: UpdateChallengeDto, @AuthenticatedUser() user) {
    return await this.challengesService.updateChallenge(id, updateData, user.id);
  }  

  @Get()
  @Roles("manager", "coder") // Manager & Coder dürfen diese Route aufrufen
  async getAllChallenges(@AuthenticatedUser() user) {
    return await this.challengesService.getAllChallenges();
  }

  @Get(":id")
  @Roles("manager", "coder") // Manager & Coder dürfen diese Route aufrufen
  async getChallengeById(@Param("id") id: string, @AuthenticatedUser() user) {
    return await this.challengesService.getChallengeById(id);
  }

  @Delete(":id")
  @Roles("manager") // Nur Manager dürfen diese Route aufrufen
  async deleteChallenge(@Param("id") id: string, @AuthenticatedUser() user) {
    return await this.challengesService.deleteChallenge(id);
  }
}
