import App from "../App";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

describe("Delete Record Test", () => {
  it(
    "登録された学習記録を削除ボタンを押すと記録が1つ減る",async () => {
      render(<App />);

      console.log(screen.debug()); // DOM全体の状態を出力

      // 初期の記録数を取得
      const initialRecords = await screen.findAllByTestId("record-item");
      const initialCount = initialRecords.length;
      console.log("Initial Count:", initialCount);

      // 最初の削除ボタンをクリック
      const deleteButton = screen.findAllByTestId("delete-button")[0];
      console.log("削除ボタン:", deleteButton);
      await userEvent.click(deleteButton);
      console.log("削除ボタンをクリックしました");

      await waitFor(async () => {
        const updatedRecords = await screen.findAllByTestId("record-item");
        const updatedCount = updatedRecords.length;
        console.log("Updated Count after deletion:", updatedCount);
        expect(updatedCount).toBe(initialCount - 1);
      }, { timeout: 1000 });
      

      expect(updatedCount).toBe(initialCount - 1);
    },
    15000 // テスト全体のタイムアウトを10秒に設定
  );
});
