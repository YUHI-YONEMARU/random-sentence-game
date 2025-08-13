// lib/utils.ts
import { whoOptions, whereOptions, whatOptions } from "./data";

// localStorageから選択肢を取得
export function loadOptions(): {
  who: string[];
  where: string[];
  what: string[];
} {
  const who = JSON.parse(localStorage.getItem('whoOptions') || '[]');
  const where = JSON.parse(localStorage.getItem('whereOptions') || '[]');
  const what = JSON.parse(localStorage.getItem('whatOptions') || '[]');
  return {
    who: who.length > 0 ? who : whoOptions,
    where: where.length > 0 ? where : whereOptions,
    what: what.length > 0 ? what : whatOptions,
  };
}

// localStorageに選択肢を保存
export function saveOptions(
  who: string[],
  where: string[],
  what: string[]
): void {
  localStorage.setItem('whoOptions', JSON.stringify(who));
  localStorage.setItem('whereOptions', JSON.stringify(where));
  localStorage.setItem('whatOptions', JSON.stringify(what));
}