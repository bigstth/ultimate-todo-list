import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(6)
  description: string;
}
