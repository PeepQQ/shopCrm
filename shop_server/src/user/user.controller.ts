import { Body, Controller, Post } from '@nestjs/common';
import { InviteUserConfirmDto, InviteUserDto } from './dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(readonly userServite: UserService) {}

  @Post('invite')
  inviteUser(@Body() data: InviteUserDto) {
    return this.userServite.inviteUser(data);
  }

  @Post('inviteConfirm')
  inviteUserConfirm(@Body() data: InviteUserConfirmDto) {
    return this.userServite.inviteUserConfirm(data);
  }
}
