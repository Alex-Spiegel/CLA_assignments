import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException  } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// import { JwtService } from "@nestjs/jwt"; // validation didn't work with Nest's JwtService...
import { ROLES_KEY } from "./roles.decorator";
import * as jwt from "jsonwebtoken" // ... am using jsonwetoken isntead

@Injectable()
export class JwtAuthGuard implements CanActivate { // CanActive -> Nest Ding, das schaut, ob Anfrage erlaubt ist
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) { // schaut, ob Token im Header vorhanden ist
      throw new UnauthorizedException("No token provided");
    }

    const token = authHeader.split(" ")[1];

    try { 
        // manuelle Prüfung mit `jsonwebtoken`
        const payload = jwt.verify(token, process.env.JWT_SECRET || "default-secret") as jwt.JwtPayload; // hier münzen wir den Payload auf jwt.JwtPayload um
        request.user = { id: payload.id, email: payload.email, role: payload.role }; // Benutzer-Infos ins Request-Objekt schreiben
        
        // erlaubte Rollen aus dem `@Roles()`-Dekorator holen/ lesen
        const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

         if (requiredRoles && !requiredRoles.includes(payload.role)) { // Vgl. Benutzerrolle aus dem Token mit tatsächlich erlaubten Rollen
        throw new ForbiddenException("You do not have permission to access this resource"); // else, das hier
         }

         return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
