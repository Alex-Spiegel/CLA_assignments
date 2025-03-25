// HAUPTMODUL der Anwendung, AppModule ist das Root-Modul und importiert andere Module
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ChallengesModule } from "./challenges/challenges.module";

@Module({
  imports: [ // hier kommen andere Module rein, z.b. MongooseModule
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI"),
      }),
      inject: [ConfigService],
    }),
    ChallengesModule, // mein ChallengesModule wird hier importiert
  ], 
  controllers: [AppController], // Hier kommen Controller rein
  providers: [AppService], // hier kommen Services rein
})
export class AppModule {}