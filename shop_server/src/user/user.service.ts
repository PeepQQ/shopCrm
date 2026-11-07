import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InviteUserConfirmDto, InviteUserDto } from './dto';
import { transporter, verifyToken } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async userData(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async inviteUser({ redirectUrl, email }: InviteUserDto) {
    const inviteToken = await this.jwtService.signAsync(
      {
        email,
      },
      {
        expiresIn: '30m',
        secret: process.env['JWT_SECRET']!,
      },
    );

    const isExists = await this.prisma.userInvites.findUnique({
      where: { token: inviteToken },
    });

    if (isExists)
      throw new BadRequestException(
        'Приглашение для этого пользователя уже создано',
      );

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Invite',
        text: `${process.env.CLIENT_URL}/inviteUserConfirm?token=${inviteToken}${redirectUrl ? `&redirectUrl=${redirectUrl}` : ''}`,
      });
    } catch (err) {
      throw new BadRequestException(
        'При отправке приглашения произошла ошибка',
      );
    }

    return await this.prisma.userInvites.create({
      data: { token: inviteToken },
    });
  }

  async inviteUserConfirm(data: InviteUserConfirmDto) {
    const invite = await this.prisma.userInvites.findUnique({
      where: { token: data.token },
    });

    if (!invite)
      throw new BadRequestException('Приглашение истекло или не действительно');

    const { email } = await verifyToken(data.token);

    if (!email)
      throw new BadRequestException('Приглашение истекло или не действительно');

    await this.prisma.userInvites.delete({
      where: { id: invite.id },
    });

    return await this.authService.register({
      email: email,
      name: data.name,
      password: data.password,
    });
  }
}
