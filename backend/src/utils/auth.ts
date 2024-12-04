import { hash, compare } from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { env } from '../config/env';

const SALT_ROUNDS = 10;
const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET);
const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN;

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return compare(password, hashedPassword);
};

export const generateToken = async (userId: string): Promise<string> => {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
  
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
}; 