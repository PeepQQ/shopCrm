import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Login, Register } from './types';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: Register) {
    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: passwordHash,
      },
    });

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        expiresIn: '30m',
      },
    );

    return {
      accessToken,
    };
  }

  async login(data: Login) {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    await this.prisma.refreshToken.updateMany({
      where: {
        userId: user.id,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    const refreshTokenHash = createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    const expiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: refreshTokenHash,
        expiresAt,
        userId: user.id,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async me(userId: number) {
    const user = this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken);

    const tokenHash = createHash('sha256').update(refreshToken).digest('hex');

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: {
        tokenHash: tokenHash,
        revokedAt: null,
      },
    });

    if (!storedToken) {
      throw new UnauthorizedException();
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    await this.prisma.refreshToken.updateMany({
      where: {
        userId: user.id,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    const newAccessToken = await this.createAccessToken(user);
    const newRefreshToken = await this.createRefreshToken(user);

    const refreshTokenHash = createHash('sha256')
      .update(newRefreshToken)
      .digest('hex');

    const expiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: refreshTokenHash,
        expiresAt,
        userId: user.id,
      },
    });

    return { newAccessToken, newRefreshToken };
  }

  private async createAccessToken(user: User) {
    return await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      {
        expiresIn: '30m',
      },
    );
  }

  private async createRefreshToken(user: User) {
    return await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        expiresIn: '10d',
      },
    );
  }
}
