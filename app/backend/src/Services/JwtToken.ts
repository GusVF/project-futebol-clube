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
  const token = jwt.sign(payload, 'SECRET', config);
  return token;
}

// function verify(token: string): AppJwtPayload {
//   const decoded = Jwt.verify(token, process.env.JWT_SECRET);
//   return decoded as AppJwtPayload;
// }

export default {
  generateToken,
  // verify,
};
