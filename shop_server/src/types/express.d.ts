import type { User as UserType } from 'src/generated/prisma/client';

declare global {
  namespace Express {
    interface User extends UserType {}
  }
}
