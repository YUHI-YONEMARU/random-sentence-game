
// app/history/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function History() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // クライアントサイドで履歴を共有する方法として、localStorageを使用
    // 実際のアプリではサーバーや状態管理ライブラリを検討
    const savedHistory = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(savedHistory);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">生成履歴</h1>
      {history.length === 0 ? (
        <p className="text-lg">履歴がありません。</p>
      ) : (
        <ul className="bg-white p-4 rounded shadow w-full max-w-md">
          {history.map((item, index) => (
            <li key={index} className="py-2 border-b last:border-b-0">
              {item}
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ホームに戻る
      </Link>
    </div>
  );
}