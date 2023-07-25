// typings.d.ts
import { FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    file: {
      fileRead: () => Promise<Buffer>;
    };
  }
}
