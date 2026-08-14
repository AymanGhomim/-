"use client";
import { X, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export function Badge({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "green" | "gray" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export function EmptyState({ title = "لا توجد نتائج", text = "جرّب تغيير خيارات البحث أو أضف بيانات جديدة." }: { title?: string; text?: string }) {
  return <div className="empty-state"><div className="empty-icon">⌂</div><h3>{title}</h3><p>{text}</p></div>;
}
export function ConfirmDialog({ open, title, onCancel, onConfirm }: { open: boolean; title?: string; onCancel: () => void; onConfirm: () => void }) {
  useEffect(() => { const key = (e: KeyboardEvent) => e.key === "Escape" && onCancel(); if (open) window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [open, onCancel]);
  if (!open) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={onCancel}><div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={e => e.stopPropagation()}>
    <button className="icon-button dialog-close" onClick={onCancel} aria-label="إغلاق"><X size={20}/></button>
    <div className="dialog-warning"><AlertTriangle size={25}/></div><h3 id="dialog-title">{title || "هل أنت متأكد من حذف هذا العنصر؟"}</h3><p>لا يمكن التراجع عن هذا الإجراء بعد الحذف.</p>
    <div className="dialog-actions"><button className="btn btn-ghost" onClick={onCancel}>إلغاء</button><button className="btn btn-danger" onClick={onConfirm}>حذف</button></div>
  </div></div>;
}
export function SkeletonGrid() { return <div className="card-grid">{[1,2,3,4].map(i => <div className="skeleton-card" key={i}><span/><div/><i/></div>)}</div>; }
