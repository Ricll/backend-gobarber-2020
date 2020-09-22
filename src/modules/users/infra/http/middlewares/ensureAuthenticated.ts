import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  expr: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is Missing', 401);
  }
  // separa Bearer do token ['bearer', '769345347]
  //                        type       token
  // [, token] -> JS strategy

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, AuthConfig.jwt.secret);
    // [as TokenPayload] e uma maneira de forçar uma variavel a ser o que voce precisa
    // E uma estrategia do typescript
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
