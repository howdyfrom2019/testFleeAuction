export function shuffle<T = unknown>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}
