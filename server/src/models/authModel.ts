import db from '../db.ts';
import type { User } from '../types/user.ts';

export function createUser(username: string, passwordHash: string): Promise<User> {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (username, passwordHash) VALUES (?, ?)',
      [username, passwordHash],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, username, passwordHash });
      }
    );
  });
}

export function findUserByUsername(username: string): Promise<User | undefined> {
  return new Promise((resolve, reject) => {
    db.get<User>(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}


export function saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO tokens (userId, refreshToken) VALUES (?, ?)
       ON CONFLICT(userId) DO UPDATE SET refreshToken=excluded.refreshToken`,
      [userId, refreshToken],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export function findRefreshToken(token: string): Promise<{ userId: number; refreshToken: string } | undefined> {
  return new Promise((resolve, reject) => {
    db.get<{ userId: number; refreshToken: string }>(
      'SELECT * FROM tokens WHERE refreshToken = ?',
      [token],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}
