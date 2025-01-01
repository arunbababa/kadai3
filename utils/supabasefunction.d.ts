// タスクの型を定義
export interface Todo {
    id: number;
    title: string;
    time: number;
  }
  
  // 関数の型定義
  export declare const getAllTodos: () => Promise<Todo[]>;
  export declare const addTodo: (title: string, time: number) => Promise<Todo[] | null>;
  export declare const deleteTodo: (id: number) => Promise<Todo[] | null>;
  