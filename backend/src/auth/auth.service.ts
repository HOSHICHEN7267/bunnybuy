// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) {}

  async register(username: string, email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const newUser = this.usersRepo.create({ username, email, password_hash: hash, role: 'user', });
    await this.usersRepo.save(newUser);
    return { message: '註冊成功' };
  }

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new UnauthorizedException('帳號或密碼錯誤');
    }

    const payload = {
      sub: user.user_id,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }


  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET || 'mysecret',
      });

      const newAccessToken = this.jwtService.sign({
        sub: payload.sub,
        username: payload.username,
        role: payload.role,
      }, {
        expiresIn: '1h',
      });

      return { access_token: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Refresh token 無效或已過期');
    }
  }
}
