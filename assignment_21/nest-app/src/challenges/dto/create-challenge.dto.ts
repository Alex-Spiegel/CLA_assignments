import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsEnum, 
  ValidateNested, 
  IsObject, 
  IsArray, 
  ArrayNotEmpty,
  IsNumber
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO für Code Inputs
class CodeInputDto {
  @IsString()
  @IsNotEmpty({ message: "Function parameter name cannot be empty!" })
  name: string;

  @IsEnum(['number', 'string'], { message: "Function parameter type must be 'number' or 'string'!" })
  type: 'number' | 'string';
}

// DTO für Code Text
class CodeTextDto {
  @IsString()
  @IsEnum(['py', 'js'], { message: "Code language must be 'py' or 'js'!" })
  language: 'py' | 'js';

  @IsString()
  @IsNotEmpty({ message: "Code should not be empty!" })
  text: string;
}

// DTO für Code Block
export class CodeDto {
  @IsString()
  @IsNotEmpty({ message: "Function name is required!" })
  function_name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CodeTextDto)
  code_text: CodeTextDto;

  @IsArray()
  @ArrayNotEmpty({ message: "At least one function parameter is required!" }) 
  @ValidateNested({ each: true }) 
  @Type(() => CodeInputDto)
  inputs: CodeInputDto[];
}

// DTO für Test Cases
class TestInputDto {
  @IsString()
  @IsNotEmpty({ message: "Test case parameter name cannot be empty!" })
  name: string;

  value: any; // Kann Number oder String sein

  @IsOptional()
  @IsEnum(['number', 'string'], { message: "Test case parameter type must be 'number' or 'string'!" })
  type?: 'number' | 'string'; 
}

class TestDto {
  @IsNumber()
  @IsNotEmpty({ message: "Test weight is required!" })
  weight: number;

  @IsArray()
  @ArrayNotEmpty({ message: "At least one input is required for a test case!" })
  @ValidateNested({ each: true })
  @Type(() => TestInputDto)
  inputs: TestInputDto[];

  @IsNotEmpty({ message: "Expected output is required!" })
  output: any;
}

// Haupt DTO für Challenge
export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty({ message: "Title is required!" })
  title: string;

  @IsString()
  @IsNotEmpty({ message: "Category is required!" })
  category: string;

  @IsString()
  @IsNotEmpty({ message: "Enter a description!" })
  description: string;

  @IsString()
  @IsEnum(['Easy', 'Moderate', 'Hard'], { message: "Difficulty must be 'Easy', 'Moderate', or 'Hard'!" })
  level: 'Easy' | 'Moderate' | 'Hard';

  @IsObject()
  @ValidateNested()
  @Type(() => CodeDto)
  code: CodeDto;

  @IsArray()
  @ArrayNotEmpty({ message: "At least one test case is required!" })
  @ValidateNested({ each: true })
  @Type(() => TestDto)
  tests: TestDto[];

  @IsOptional()
  @IsString()
  manager?: string;
}
