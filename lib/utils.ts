// lib/utils.ts
import { subjects, places, actions } from "./data";

export function generateSentence(): string {
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const place = places[Math.floor(Math.random() * places.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  return `${subject}が${place}で${action}`;
}

// subjects, places, actionsを再エクスポート
export { subjects, places, actions };