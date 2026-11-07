import { IsEmail, IsString, Length } from 'class-validator';

export interface Login {
  email: string;
  password: string;
}

export class RegisterDto {
  @IsString()
  @Length(3, 16)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(8, 32)
  password!: string;
}
