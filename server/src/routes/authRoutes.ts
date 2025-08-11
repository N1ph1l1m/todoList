import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, findUserByUsername , saveRefreshToken,findRefreshToken } from '../models/authModel.ts';

dotenv.config();

const ACCESS_TOKEN_SECRET  =  process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET  =  process.env.REFRESH_TOKEN_SECRET
type VerifyErrors = jwt.VerifyErrors;
const router = express.Router();

function generateAccessToken(user:object):string {
  if (!ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET не задан");
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}


function generateRefreshToken(user:object):string {
  if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET не задан");
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: 'Введите username и password' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, passwordHash);
    res.json({ id: newUser.id, username: newUser.username });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);

    if (!user) return res.status(401).json({ error: 'Неверные учетные данные' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Неверные учетные данные' });

    const payload = { userId: user.id, username: user.username };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await saveRefreshToken(user.id, refreshToken);

    res.json({  id: user.id, accessToken, refreshToken , });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/token', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);

    const tokenRow = await findRefreshToken(token);
    if (!tokenRow) return res.sendStatus(403);
    if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET не задан");
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err:VerifyErrors | null , user: any) => {
      if (err) return res.sendStatus(403);
      const payload = { userId: user.userId, username: user.username };
      const accessToken = generateAccessToken(payload);
      res.json({ accessToken });
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
