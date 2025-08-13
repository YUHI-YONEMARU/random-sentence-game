'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { whoOptions, whereOptions, whatOptions } from '@/lib/data';
import { loadOptions, saveOptions } from '@/lib/utils';

export default function ManageOptions() {
  const [options, setOptions] = useState({
    who: whoOptions,
    where: whereOptions,
    what: whatOptions,
  });
  const [newWho, setNewWho] = useState('');
  const [newWhere, setNewWhere] = useState('');
  const [newWhat, setNewWhat] = useState('');

  // 初期化時にlocalStorageから選択肢を読み込む
  useEffect(() => {
    const loadedOptions = loadOptions();
    setOptions(loadedOptions);
  }, []);

  // 選択肢の追加
  const addOption = (type: 'who' | 'where' | 'what', value: string) => {
    if (value.trim() === '') return;
    setOptions((prev) => {
      const newOptions = {
        ...prev,
        [type]: [...prev[type], value.trim()],
      };
      // 状態更新後に最新の値を保存
      saveOptions(newOptions.who, newOptions.where, newOptions.what);
      return newOptions;
    });
    // 入力フィールドをクリア
    if (type === 'who') setNewWho('');
    if (type === 'where') setNewWhere('');
    if (type === 'what') setNewWhat('');
  };

  // 選択肢の削除
  const deleteOption = (type: 'who' | 'where' | 'what', index: number) => {
    setOptions((prev) => {
      const newOptions = {
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      };
      // 状態更新後に最新の値を保存
      saveOptions(newOptions.who, newOptions.where, newOptions.what);
      return newOptions;
    });
  };

  // 選択肢のリセット
  const resetOptions = () => {
    const newOptions = {
      who: whoOptions,
      where: whereOptions,
      what: whatOptions,
    };
    setOptions(newOptions);
    saveOptions(newOptions.who, newOptions.where, newOptions.what);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">選択肢管理</h1>

      {/* 誰が */}
      <div className="w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-2">誰が</h2>
        <div className="flex mb-2">
          <input
            type="text"
            value={newWho}
            onChange={(e) => setNewWho(e.target.value)}
            placeholder="新しい「誰が」を入力"
            className="flex-1 p-2 border rounded-l"
          />
          <button
            onClick={() => addOption('who', newWho)}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            追加
          </button>
        </div>
        <ul className="space-y-2">
          {options.who.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item}</span>
              <button
                onClick={() => deleteOption('who', index)}
                className="text-red-500 hover:text-red-700"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* どこで */}
      <div className="w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-2">どこで</h2>
        <div className="flex mb-2">
          <input
            type="text"
            value={newWhere}
            onChange={(e) => setNewWhere(e.target.value)}
            placeholder="新しい「どこで」を入力"
            className="flex-1 p-2 border rounded-l"
          />
          <button
            onClick={() => addOption('where', newWhere)}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            追加
          </button>
        </div>
        <ul className="space-y-2">
          {options.where.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item}</span>
              <button
                onClick={() => deleteOption('where', index)}
                className="text-red-500 hover:text-red-700"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 何をした */}
      <div className="w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-2">何をした</h2>
        <div className="flex mb-2">
          <input
            type="text"
            value={newWhat}
            onChange={(e) => setNewWhat(e.target.value)}
            placeholder="新しい「何をした」を入力"
            className="flex-1 p-2 border rounded-l"
          />
          <button
            onClick={() => addOption('what', newWhat)}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            追加
          </button>
        </div>
        <ul className="space-y-2">
          {options.what.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item}</span>
              <button
                onClick={() => deleteOption('what', index)}
                className="text-red-500 hover:text-red-700"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={resetOptions}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          選択肢をリセット
        </button>
        <Link
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}