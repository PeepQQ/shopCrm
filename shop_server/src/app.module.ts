import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { OptionalJwtAuthGuard } from './jwt/optionalJwtAuth.guard';

@Module({
  imports: [AuthModule, AdminModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: OptionalJwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
