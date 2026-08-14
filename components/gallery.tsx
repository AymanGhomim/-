"use client";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useState } from "react";
export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0); const [lightbox, setLightbox] = useState(false);
  const move = (direction: number) => setActive(x => (x + direction + images.length) % images.length);
  useEffect(() => { const key = (e: KeyboardEvent) => { if (!lightbox) return; if (e.key === "Escape") setLightbox(false); if (e.key === "ArrowLeft") move(1); if (e.key === "ArrowRight") move(-1); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); });
  if (!images.length) return null;
  return <><div className="gallery"><button className="gallery-main" onClick={() => setLightbox(true)} aria-label="فتح معرض الصور"><img src={images[active]} alt={`${title} - صورة ${active + 1}`}/><span className="gallery-expand"><Expand size={17}/> عرض بالحجم الكامل</span><span className="gallery-index">{active + 1} / {images.length}</span></button><div className="gallery-thumbs">{images.slice(0,5).map((src, i) => <button key={src+i} className={active === i ? "active" : ""} onClick={() => setActive(i)} aria-label={`عرض الصورة ${i+1}`}><img src={src} alt=""/>{i === 4 && images.length > 5 && <span>+{images.length - 5}<small> صورة</small></span>}</button>)}</div></div>{lightbox && <div className="lightbox" role="dialog" aria-modal="true"><button className="lightbox-close" onClick={() => setLightbox(false)} aria-label="إغلاق"><X/></button><button className="lightbox-next" onClick={() => move(1)} aria-label="الصورة التالية"><ChevronLeft/></button><img src={images[active]} alt={`${title} - صورة ${active + 1}`}/><button className="lightbox-prev" onClick={() => move(-1)} aria-label="الصورة السابقة"><ChevronRight/></button><span>{active + 1} من {images.length}</span></div>}</>;
}
