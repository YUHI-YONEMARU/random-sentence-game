// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { generateSentence, subjects, places, actions } from "@/lib/utils";

export default function Home() {
  const [sentence, setSentence] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [slotStates, setSlotStates] = useState({
    subject: "",
    place: "",
    action: "",
  });
  const [isSpinning, setIsSpinning] = useState(false);

  // スロットアニメーションの制御
  const startSpin = () => {
    setIsSpinning(true);
    setSentence("");
    setSlotStates({ subject: "", place: "", action: "" });

    // 最終的な選択肢を事前に決定
    const finalSubject = subjects[Math.floor(Math.random() * subjects.length)];
    const finalPlace = places[Math.floor(Math.random() * places.length)];
    const finalAction = actions[Math.floor(Math.random() * actions.length)];

    // ランダムに選択肢を切り替えるアニメーション
    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) {
        setSlotStates((prev) => ({
          ...prev,
          subject: subjects[Math.floor(Math.random() * subjects.length)],
        }));
      } else if (step === 1) {
        setSlotStates((prev) => ({
          ...prev,
          place: places[Math.floor(Math.random() * places.length)],
        }));
      } else if (step === 2) {
        setSlotStates((prev) => ({
          ...prev,
          action: actions[Math.floor(Math.random() * actions.length)],
        }));
      }
      step++;
    }, 1000); // 高速で切り替え

    // 各パートを順に停止
    setTimeout(() => {
      setSlotStates((prev) => ({ ...prev, subject: finalSubject }));
    }, 1000);

    setTimeout(() => {
      setSlotStates((prev) => ({ ...prev, place: finalPlace }));
    }, 2000);

    setTimeout(() => {
      setSlotStates((prev) => ({ ...prev, action: finalAction }));
      const newSentence = `${finalSubject}が${finalPlace}で${finalAction}`;
      setSentence(newSentence);
      setHistory((prev) => {
        const newHistory = [newSentence, ...prev].slice(0, 10);
        localStorage.setItem("history", JSON.stringify(newHistory));
        return newHistory;
      });
      setIsSpinning(false);
      clearInterval(interval);
    }, 3000);
  };

  const handleReset = () => {
    setSentence("");
    setSlotStates({ subject: "", place: "", action: "" });
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">ランダム文章メーカー</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={startSpin}
          disabled={isSpinning}
          className={`px-4 py-2 rounded text-white ${
            isSpinning ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          スタート
        </button>
        <button
          onClick={handleReset}
          disabled={isSpinning}
          className={`px-4 py-2 rounded text-white ${
            isSpinning ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          リセット
        </button>
        <Link
          href="/history"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          履歴を見る
        </Link>
      </div>
      <div className="flex space-x-2 mb-4">
        <div className="slot bg-white p-4 rounded shadow text-center w-24">
          <div className={isSpinning && !slotStates.subject ? "animate-spin-slot" : ""}>
            {slotStates.subject || "？"}
          </div>
        </div>
        <span className="text-xl">が</span>
        <div className="slot bg-white p-4 rounded shadow text-center w-24">
          <div className={isSpinning && !slotStates.place ? "animate-spin-slot" : ""}>
            {slotStates.place || "？"}
          </div>
        </div>
        <span className="text-xl">で</span>
        <div className="slot bg-white p-4 rounded shadow text-center w-24">
          <div className={isSpinning && !slotStates.action ? "animate-spin-slot" : ""}>
            {slotStates.action || "？"}
          </div>
        </div>
      </div>
      {sentence && (
        <p className="text-xl bg-white p-4 rounded shadow">{sentence}</p>
      )}
    </div>
  );
}