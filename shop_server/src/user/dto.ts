import { IsEmail, IsOptional, IsString, Length, Min } from 'class-validator';

export class InviteUserDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  redirectUrl?: string;
}

export class InviteUserConfirmDto {
  @IsString()
  token!: string;

  @IsString()
  @Length(3, 16)
  name!: string;

  @IsString()
  @Length(8, 32)
  password!: string;
}
