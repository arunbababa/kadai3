import React, { ChangeEvent, useEffect, useState } from "react";
import { InputRecord } from "./components/InputRecord";
import { CompleteTodos } from "./components/CompleteTodos";
const { addTodo, deleteTodo, getAllTodos } = require("../utils/supabasefunction.js");

export type Todo = {
  id: number | null;
  title: string | null;
  time: number | null;
};

export type LearningRecord = {
  title: string;
  time: number;
};

function App() {
  // フックたち
  const [title, setTitle] = useState<string>(""); //【学習内容】のフォームをフック
  const [time, setTime] = useState<number>(0); //【学習時間】のフォームをフック
  const [records, setRecords] = useState<LearningRecord[]>([]); // 【登録した内容】をフック
  const [times, setTimes] = useState<number[]>([]); // 【学習時間リスト】をフック
  const [todos, setTodos] = useState<Todo[]>([]); // 【Supabaseから取得したタスク一覧】
  const [error, setError] = useState<string>(""); // エラーメッセージ

  // 初回レンダリング時にタスクリストを取得
  useEffect(() => {
    const getTodos = async () => {
      const todos: Todo[] = await getAllTodos();
      setTodos(todos);
      // console.log(todos);
    };
    getTodos();
  }, []);

  // インプットの入力するたびに入力値をset~する
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value); // 学習内容の入力変更
  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) =>
    setTime(parseInt(e.target.value, 10)); // 学習時間の入力変更

  // 【登録】を押したときの処理
  const onClickAdd = async () => {
    if (title === "" || time <= 0) {
      console.log("入力が不足しています");
      setError("入力されていない項目があります");
      console.log(error);
      return;
    }

    // 新しい登録内容を定義
    const newRecord: LearningRecord = { title, time };

    // Supabase にタスクを追加
    const newTodoResponse: Todo[] | null = await addTodo(title, time);

    if (!newTodoResponse || newTodoResponse.length === 0) {
      console.error("新しいTodoの追加に失敗しました");
    } else {
      // 最初の要素を取得
      const newTodo: Todo = newTodoResponse[0];
      console.log("newTodoの内容:", newTodo);

      // todosに追加
      setTodos([...todos, newTodo]);
    }


    // recordsとtimesを更新
    setRecords([...records, newRecord]);
    setTimes([...times, time]);
    setTitle(""); // 【学習内容】のフォームをリセット
    setTime(0); // 【学習時間】のフォームをリセット
    setError("");
  };

  const onClickDelete = async (id: number) => {
    
    await deleteTodo(id);
    console.log(`deleteTodo: ID ${id} を削除します`);
    const result = await deleteTodo(id);
    console.log("deleteTodo result:", result);

    const updatedTodos = await getAllTodos();
    console.log("updatedTodos:", updatedTodos);

    setTodos(updatedTodos); // 最新のデータで画面を更新
  };

  return (
    <>
      <title data-testid="title">学習管理アプリ</title>
      {error && (
        <p data-testid="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}{" "}
      {/* エラーメッセージの表示 */}
      <InputRecord
        title={title}
        time={time}
        onChangeTitle={onChangeTitle}
        onChangeTime={onChangeTime}
        onClick={onClickAdd}
      />

      {/* todosはsupabaseの内容、titleと学習時間のこと */}
      <CompleteTodos
        records={records}
        times={times}
        todos={todos} // プロップスとして渡す
        onDelete={onClickDelete}
      />

      {/* Supabaseの学習記録一覧
      {todos.map((todo) => (
        <p key={todo.id}>
          {todo.title} {todo.time}時間
        </p>
      ))} */}
    </>
  );
}

export default App;
