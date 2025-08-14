
import jwt  from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET


export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Нет токена в заголовке Authorization');
    return res.sendStatus(401);
  }

  if (!ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET не задан');

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      console.log(' Ошибка верификации токена:', err);
      return res.sendStatus(403);
    }

    console.log('Токен успешно проверен');
    req.user = user;
    next();
  });
}
