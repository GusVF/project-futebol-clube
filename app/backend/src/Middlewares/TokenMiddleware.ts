import { NextFunction, Request, Response } from 'express';
import JwtToken from '../Services/JwtToken';

export type Authenticate = Request & {
  authorization: {
    email: string
  }
};

async function TokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = JwtToken.verifyToken(authorization);
    (req as Authenticate).authorization = {
      email: decoded.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
export default TokenMiddleware;
