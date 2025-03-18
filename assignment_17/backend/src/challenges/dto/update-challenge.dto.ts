import { 
  IsString, 
  IsOptional, 
  IsEnum, 
  ValidateNested, 
  IsObject, 
  IsArray, 
  IsNumber
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO für Code Inputs
class CodeInputDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(['number', 'string'], { message: "Function parameter type must be 'number' or 'string'!" })
  @IsOptional()
  type?: 'number' | 'string';
}

// DTO für Code Text
class CodeTextDto {
  @IsString()
  @IsEnum(['py', 'js'], { message: "Code language must be 'py' or 'js'!" })
  @IsOptional()
  language?: 'py' | 'js';

  @IsString()
  @IsOptional()
  text?: string;
}

// DTO für Code Block
export class CodeDto {
  @IsString()
  @IsOptional()
  function_name?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CodeTextDto)
  @IsOptional()
  code_text?: CodeTextDto;

  @IsArray()
  @ValidateNested({ each: true }) 
  @Type(() => CodeInputDto)
  @IsOptional()
  inputs?: CodeInputDto[];
}

// DTO für Test Cases
class TestInputDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  value?: any; // Kann Number oder String sein

  @IsEnum(['number', 'string'], { message: "Test case parameter type must be 'number' or 'string'!" })
  @IsOptional()
  type?: 'number' | 'string';
}

class TestDto {
  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestInputDto)
  @IsOptional()
  inputs?: TestInputDto[];

  @IsOptional()
  output?: any;
}

// DTO für Challenge Update
export class UpdateChallengeDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsEnum(['Easy', 'Moderate', 'Hard'], { message: "Difficulty must be 'Easy', 'Moderate', or 'Hard'!" })
  @IsOptional()
  level?: 'Easy' | 'Moderate' | 'Hard';

  @IsObject()
  @ValidateNested()
  @Type(() => CodeDto)
  @IsOptional()
  code?: CodeDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestDto)
  @IsOptional()
  tests?: TestDto[];

  @IsOptional()
  @IsString()
  manager?: string;
}
