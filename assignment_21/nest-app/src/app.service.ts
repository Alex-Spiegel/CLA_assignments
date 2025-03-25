// services steuern auch hier die Geschäftslogik & Datenbank-Zugriff,
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
