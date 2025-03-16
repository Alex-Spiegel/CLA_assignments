import { IsString, IsNotEmpty, IsOptional, IsEnum, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class CodeTextDto {
  @IsString()
  @IsEnum(['py', 'js']) // sagt, nur bestimmte Werte sind erlaubt
  language: 'py' | 'js';

  @IsString()
  text: string;
}

export class CodeDto {
  @IsString()
  function_name: string;

  @IsObject()
  @ValidateNested() // validiert für verschachtelte Objekte
  @Type(() => CodeTextDto)
  code_text: CodeTextDto;
}

export class CreateChallengeDto {
  @IsString() // validiert string Felder
  @IsNotEmpty() // validiert string Felder
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsEnum(['Easy', 'Moderate', 'Hard'])
  level: 'Easy' | 'Moderate' | 'Hard';

  @IsObject()
  @ValidateNested()
  @Type(() => CodeDto)
  code: CodeDto;

  @IsOptional()
  @IsString()
  manager?: string;
}
