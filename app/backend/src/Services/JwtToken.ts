import { sign } from 'jsonwebtoken';

type AppJwtPayload = {
  email: string,
  password: string,
};

function generateToken<type extends AppJwtPayload>(payload: type): string {
  const token = sign(payload, 'SECRET');
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
