import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    // console.log('token', token, 'authConfig.jwt.secret', authConfig.jwt.secret);

    const decoded = verify(token, authConfig.jwt.secret);

    // console.log(decoded);

    const { sub } = decoded as tokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('invalid JWT token', 401);
  }
}
