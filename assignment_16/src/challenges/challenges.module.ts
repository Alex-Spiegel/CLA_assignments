import { Module } from "@nestjs/common";
import { ChallengesController } from "./challenges.controller";
import { ChallengesService } from "./challenges.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Challenge, ChallengeSchema } from "./schemas/challenges.schema";
import { Manager, ManagerSchema } from "../managers/schemas/manager.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "default-secret",
      signOptions: { expiresIn: "2h" }, // stellt sicher, dass dieser Algorithmus beim signieren verwendet wird
    }),
    MongooseModule.forFeature([
      { name: Challenge.name, schema:ChallengeSchema }, // ChallengeSchema wird hier registriert
      { name: Manager.name, schema: ManagerSchema }, // ManagerSchema auch
    ]),
  ],
  controllers: [ChallengesController], // Controller hier im Modul registriert
  providers: [ChallengesService], // Service hier im Modul registriert
  exports: [ChallengesService], // export, falls das Service-Modul in anderen Modulen verwendet werden soll
})
export class ChallengesModule {}
