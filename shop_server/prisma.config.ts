import { defineConfig } from 'prisma/config';

if (!process.env.DOCKER_CONTAINER) {
  require('dotenv').config();
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
