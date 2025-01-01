import React from "react";
import { Todo,LearningRecord } from "../App";

type CompleteTodosProps = {
  records: LearningRecord[]; // 学習内容の履歴
  times: number[]; // 学習時間のリスト
  todos: Todo[];
  onDelete: (id: number) => void;
};

export const CompleteTodos:React.FC<CompleteTodosProps> = (props) => {

    

    const { todos, onDelete } = props;
    // todos の合計勉強時間を計算
    const totalTimeFromTodos = todos.reduce((acc, todo) => acc + (todo.time || 0), 0);
    return (
      <div>
        <h2>合計勉強時間: {totalTimeFromTodos} 時間</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} data-testid="record-item" style={{ display: "flex", alignItems: "center" }}>
              <p style={{ flex: 1 }}>
                {todo.title} - {todo.time} 時間
              </p>
              {/* 削除ボタン */}
              <button onClick={() => {if (todo.id !== null) {
                  onDelete(todo.id);
                }
              }} style={{ marginLeft: "10px", color: "red" }}>
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
