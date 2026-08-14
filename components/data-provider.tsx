"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialData } from "@/lib/mock-data";
import { loadData, saveData } from "@/lib/storage";
import type { AppData, Area, Building, Governorate } from "@/lib/types";

type Entity = "governorates" | "areas" | "buildings";
type DataContextValue = { data: AppData; ready: boolean; upsert: (type: Entity, item: Governorate | Area | Building) => void; remove: (type: Entity, id: string) => void; toggle: (type: Entity, id: string) => void };
const DataContext = createContext<DataContextValue | null>(null);
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(initialData); const [ready, setReady] = useState(false);
  useEffect(() => { setData(loadData()); setReady(true); }, []);
  useEffect(() => { if (ready) saveData(data); }, [data, ready]);
  const value = useMemo<DataContextValue>(() => ({ data, ready,
    upsert(type, item) { setData(prev => { const list = prev[type] as Array<typeof item>; const exists = list.some(x => x.id === item.id); return { ...prev, [type]: exists ? list.map(x => x.id === item.id ? item : x) : [...list, item] }; }); },
    remove(type, id) { setData(prev => ({ ...prev, [type]: prev[type].filter(x => x.id !== id) })); },
    toggle(type, id) { setData(prev => ({ ...prev, [type]: prev[type].map(x => x.id === id ? { ...x, status: x.status === "published" ? "hidden" : "published" } : x) })); },
  }), [data, ready]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export function useData() { const value = useContext(DataContext); if (!value) throw new Error("DataProvider is missing"); return value; }
