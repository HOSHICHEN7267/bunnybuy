// src/auth/dto/register.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: '使用者名稱必須是字串' })
  username: string;

  @IsEmail({}, { message: 'Email 格式不正確' })
  email: string;

  @MinLength(6, { message: '密碼長度至少要 6 個字元' })
  password: string;
}
