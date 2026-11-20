import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context);
    } catch (e) {}
    return true;
  }
}
