// Wichtigste Datei von NestJS. Einstiegspunkt/ entry point der App; startet NestJS-App
// Aufgaben: Erstellt App-Instanz aus AppModule, startet HTTP-Server
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);
  await app.listen(4000); // mein NestJS-Backend, läuft diesem Port
}
bootstrap();
