import db from '../db.ts';
import type { Todo } from '../types/todo.ts';

export function getTodosByUserId(userId: number): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM todos WHERE userId = ?', [userId], (err, rows:Todo[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function createTodo(title: string, userId: number): Promise<Todo> {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO todos (title, userId) VALUES (?, ?)', [title, userId], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, title, completed: 0, userId });
    });
  });
}

export function findTodoByIdAndUserId(id: number, userId: number): Promise<Todo | undefined> {
  return new Promise((resolve, reject) => {
    db.get<Todo>('SELECT * FROM todos WHERE id = ? AND userId = ?', [id, userId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}


export function toggleTodoCompleted(id: number, newCompleted: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('UPDATE todos SET completed = ? WHERE id = ?', [newCompleted, id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}


export function deleteTodoById(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}
