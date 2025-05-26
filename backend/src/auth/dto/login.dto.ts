// src/auth/dto/login.dto.ts
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email 格式不正確' })
  email: string;

  @MinLength(6, { message: '密碼長度至少要 6 個字元' })
  password: string;
}
