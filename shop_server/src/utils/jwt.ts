import jwt from 'jsonwebtoken';

export interface JwtPayload {
  [key: string]: any;
  iat?: number;
  exp?: number;
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
