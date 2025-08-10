import db from '../db.js';

export function findUserByUsername(username: string, callback: Function) {
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    callback(err, row);
  });
}

export function createUser(username: string, passwordHash: string, callback: Function) {
  db.run('INSERT INTO users (username, passwordHash) VALUES (?, ?)', [username, passwordHash], function (err) {
    callback(err, this?.lastID);
  });
}
