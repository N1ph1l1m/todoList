import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db.ts';
import { authenticateToken } from '../middleware/addMiddleware.ts';

interface User {
  id: number;
  username: string;
  passwordHash: string;
}

dotenv.config();
const router = express.Router();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
}
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Введите username и password' });

  const passwordHash = await bcrypt.hash(password, 10);

  db.run('INSERT INTO users (username, passwordHash) VALUES (?, ?)', [username, passwordHash], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, username });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get<User>('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Неверные учетные данные' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Неверные учетные данные' });

    const payload = { userId: user.id, username: user.username };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    db.run(
      `INSERT INTO tokens (userId, refreshToken) VALUES (?, ?)
       ON CONFLICT(userId) DO UPDATE SET refreshToken=excluded.refreshToken`,
      [user.id, refreshToken],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ accessToken, refreshToken });
      }
    );
  });
});

router.post('/token', (req, res) => {
  const { token } = req.body; // refreshToken приходит в body
  if (!token) return res.sendStatus(401);

  // Проверяем, есть ли токен в базе
  db.get('SELECT * FROM tokens WHERE refreshToken = ?', [token], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.sendStatus(403); // нет такого токена в базе

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      // Генерируем новый access-токен
      const payload = { userId: user.userId, username: user.username };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

      res.json({ accessToken });
    });
  });
});



router.get('/users', authenticateToken, (req, res) => {
  res.json({ message: `Привет, ${req.user.username}! Это защищённый маршрут.` });
});


export default router;
