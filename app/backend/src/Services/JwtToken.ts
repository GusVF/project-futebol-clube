import * as jwt from 'jsonwebtoken';

type AppJwtPayload = {
  email: string,
  password: string,
};

function generateToken(payload: AppJwtPayload) {
  const config: jwt.SignOptions = {
    expiresIn: '300d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'SECRET', config);
  return token;
}

function verifyToken(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET');
  return decoded as AppJwtPayload;
}

export default {
  generateToken,
  verifyToken,
};
