'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { whoOptions, whereOptions, whatOptions } from '@/lib/data';
import { loadOptions, saveOptions } from '@/lib/utils';
import { FaPlay, FaHistory, FaEdit } from 'react-icons/fa'; // アイコンをインポート

export default function Generator() {
  const [sentence, setSentence] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [options, setOptions] = useState({
    who: whoOptions,
    where: whereOptions,
    what: whatOptions,
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [slotValues, setSlotValues] = useState({ who: '', where: '', what: '' });
  const [slotStopped, setSlotStopped] = useState({
    who: false,
    where: false,
    what: false,
  });
  const slotStoppedRef = useRef(slotStopped);

  // slotStopped が更新されるたびに useRef を更新
  useEffect(() => {
    slotStoppedRef.current = slotStopped;
  }, [slotStopped]);

  // 初期化時にlocalStorageから選択肢と履歴を読み込む
  useEffect(() => {
    const loadedOptions = loadOptions();
    setOptions(loadedOptions);
    const savedHistory = localStorage.getItem('sentenceHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 履歴をlocalStorageに保存
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('sentenceHistory', JSON.stringify(history));
    }
  }, [history]);

  // スロットアニメーションのロジック
  const startSlotMachine = () => {
    setIsSpinning(true);
    setSentence(null);
    setSlotValues({ who: '', where: '', what: '' });
    setSlotStopped({ who: false, where: false, what: false });
    

    // 最終的な選択肢を事前に決定
    const finalWho = options.who[Math.floor(Math.random() * options.who.length)];
    const finalWhere = options.where[Math.floor(Math.random() * options.where.length)];
    const finalWhat = options.what[Math.floor(Math.random() * options.what.length)];

    // スロットの値をランダムに変更（回転演出）
    const interval = setInterval(() => {
      setSlotValues({
        who: slotStoppedRef.current.who ? finalWho : options.who[Math.floor(Math.random() * options.who.length)],
        where: slotStoppedRef.current.where ? finalWhere : options.where[Math.floor(Math.random() * options.where.length)],
        what: slotStoppedRef.current.what ? finalWhat : options.what[Math.floor(Math.random() * options.what.length)],
      });
    }, 100);
   
    // 順番にスロットを停止
    setTimeout(() => {
      setSlotStopped((prev) => ({ ...prev, who: true }));
      setSlotValues((prev) => ({ ...prev, who: finalWho }));
      console.log(1);
    }, 800); // 1秒後に「誰が」を停止
    setTimeout(() => {
      setSlotStopped((prev) => ({ ...prev, where: true }));
      setSlotValues((prev) => ({ ...prev, where: finalWhere }));
    }, 1600); // 2秒後に「どこで」を停止
    setTimeout(() => {
      setSlotStopped((prev) => ({ ...prev, what: true }));
      setSlotValues((prev) => ({ ...prev, what: finalWhat }));
      clearInterval(interval); // 回転停止
      setIsSpinning(false);
      // 最終的な文章をslotValuesから生成
      const finalSentence = `${finalWho}が${finalWhere}で${finalWhat}`;
      setSentence(finalSentence);
      setHistory((prev) => {
        const newHistory = [finalSentence, ...prev].slice(0, 10); // 最大10件
        return newHistory;
      });
    }, 2400); // 3秒後に「何をした」を停止し文章生成
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">だれが どこで なにをした？</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={startSlotMachine}
          disabled={isSpinning}
          className={`bg-blue-500 text-white px-16 py-3 rounded hover:bg-blue-600 flex items-center text-lg ${
            isSpinning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaPlay className="inline-block mr-2 text-lg" />スタート
        </button>
        <Link
          href="/history"
          className="bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 flex items-center text-sm"
        >
          <FaHistory className="inline-block mr-2 text-sm" />履歴
        </Link>
        <Link
          href="/manage"
          className="bg-purple-500 text-white px-3 py-1.5 rounded hover:bg-purple-600 flex items-center text-sm"
        >
          <FaEdit className="inline-block mr-2 text-sm" />編集
        </Link>
      </div>

      {/* スロット表示 */}
      <div className="flex space-x-4 mb-6">
        <div className="w-32 h-16 bg-white border-2 border-gray-300 rounded flex items-center justify-center text-lg font-semibold">
          <span
            className={`inline-block ${!slotStopped.who && isSpinning ? 'animate-spin-slot' : ''}`}
          >
            {slotValues.who || '？'}
          </span>
        </div>
        <div className="w-32 h-16 bg-white border-2 border-gray-300 rounded flex items-center justify-center text-lg font-semibold">
          <span
            className={`inline-block ${!slotStopped.where && isSpinning ? 'animate-spin-slot' : ''}`}
          >
            {slotValues.where || '？'}
          </span>
        </div>
        <div className="w-32 h-16 bg-white border-2 border-gray-300 rounded flex items-center justify-center text-lg font-semibold">
          <span
            className={`inline-block ${!slotStopped.what && isSpinning ? 'animate-spin-slot' : ''}`}
          >
            {slotValues.what || '？'}
          </span>
        </div>
      </div>

      {sentence && (
        <p className="text-xl font-semibold text-gray-800">{sentence}</p>
      )}
      
    </div>
  );
}