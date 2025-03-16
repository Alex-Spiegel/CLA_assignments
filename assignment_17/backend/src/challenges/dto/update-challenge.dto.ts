import { IsString, IsOptional, IsEnum, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CodeDto } from './create-challenge.dto';

export class UpdateChallengeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['Easy', 'Moderate', 'Hard'])
  level?: 'Easy' | 'Moderate' | 'Hard';

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CodeDto)
  code?: CodeDto;
}
