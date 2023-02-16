export function shuffle<T = unknown>(arr: T[]): T[] {
  return arr.map(v => v).sort(() => Math.random() - 0.5);
}
