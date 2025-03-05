import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles"; // ein Schlüssel für die Metadaten, fürs spätere auslesen
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles); // Funktions-Dekkorator, der eine Rolle akzeptiert
// SetMetadata("roles", roles) -> Speichert die Rollen als Metadaten am Controller oder an einer Methode.