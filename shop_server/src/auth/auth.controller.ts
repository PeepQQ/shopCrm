import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Login, Register } from './types';
import { JwtAuthGuard } from '../jwt/jwtAuth.guard';
import { type Response, type Request as RequestType } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: Register) {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: Login, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(data);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.MODE === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.MODE === 'production',
      sameSite: 'lax',
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return { success: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req: RequestType) {
    return req.user;
  }

  @Get('refresh')
  async refresh(
    @Request() req: RequestType,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { newAccessToken, newRefreshToken } = await this.authService.refresh(
      req.cookies.refresh_token,
    );

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.MODE === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60 * 1000,
    });

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.MODE === 'production',
      sameSite: 'lax',
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return { success: true };
  }
}
