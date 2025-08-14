import type { Todo } from '../todo';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<Todo, 'id' | 'title' | 'completed' | 'userId' > | undefined;
    }
  }
}
export {}
