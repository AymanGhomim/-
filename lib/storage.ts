import type { AppData } from "./types";
import { initialData } from "./mock-data";
const STORAGE_KEY = "dalil-aqar-data-v1";
export function loadData(): AppData {
  if (typeof window === "undefined") return initialData;
  try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) : initialData; }
  catch { return initialData; }
}
export function saveData(data: AppData) {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
