"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Building2, Map, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useData } from "../data-provider";
import { GovernorateCard } from "../cards";
import { PublicShell } from "../layout/public-shell";

export function HomePage() {
  const { data } = useData();
  const [govId, setGovId] = useState("");
  const [areaId, setAreaId] = useState("");
  const areas = useMemo(() => data.areas.filter((area) => area.governorateId === govId), [data.areas, govId]);
  const href = areaId ? `/governorates/${govId}/areas/${areaId}` : govId ? `/governorates/${govId}` : "/governorates";

  return (
    <PublicShell>
      <section className="hero">
        <div className="hero-glow" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={16} /> اختيارات أوضح، وقرارات أذكى</span>
            <h1>دليلك للوصول إلى<br /><em>العقارات بسهولة</em></h1>
            <p>استكشف المحافظات والمناطق والعمارات، وتعرّف على تفاصيل كل عقار وموقعه وبيانات التواصل في مكان واحد.</p>
            <div className="hero-trust">
              <span><ShieldCheck /> بيانات واضحة</span>
              <span><MapPin /> مواقع دقيقة</span>
              <span><Building2 /> عقارات مختارة</span>
            </div>
          </div>

          <div className="search-panel">
            <div className="search-panel-title">
              <span><Search /></span>
              <div><small>بحث سريع</small><b>ابدأ رحلة البحث</b><p>حدّد موقعك للوصول إلى العقارات المناسبة</p></div>
            </div>
            <div className="search-fields">
              <label>
                <span className="search-field-label">المحافظة <small>خطوة ١</small></span>
                <span className="search-select"><MapPin /><select value={govId} onChange={(event) => { setGovId(event.target.value); setAreaId(""); }}><option value="">اختر المحافظة</option>{data.governorates.map((governorate) => <option key={governorate.id} value={governorate.id}>{governorate.name}</option>)}</select></span>
              </label>
              <label>
                <span className="search-field-label">المنطقة <small>خطوة ٢</small></span>
                <span className="search-select"><Map /><select value={areaId} onChange={(event) => setAreaId(event.target.value)} disabled={!govId}><option value="">{govId ? "اختر المنطقة" : "اختر المحافظة أولًا"}</option>{areas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}</select></span>
              </label>
            </div>
            <Link href={href} className="search-submit">
              <span><b>{areaId ? "عرض العقارات" : govId ? "استكشف المحافظة" : "عرض كل المحافظات"}</b><small>{areaId ? "شاهد العقارات المتاحة في المنطقة" : "ابدأ التصفح الآن"}</small></span>
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
        <div className="hero-strip container">
          <span><b>{data.governorates.length}</b> محافظة</span>
          <span><b>{data.areas.length}</b> منطقة</span>
          <span><b>{data.buildings.length}</b> عمارة موثقة</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading"><div><span className="kicker">اكتشف مصر</span><h2>المحافظات الأكثر بحثًا</h2><p>ابدأ من المحافظة، ثم تصفح مناطقها والعقارات المتاحة فيها.</p></div><Link href="/governorates" className="text-link">عرض كل المحافظات <ArrowLeft size={17} /></Link></div>
          <div className="card-grid">{data.governorates.slice(0, 6).map((governorate) => <GovernorateCard key={governorate.id} item={governorate} />)}</div>
        </div>
      </section>

      <section className="why-section" id="about">
        <div className="container why-grid">
          <div><span className="kicker">لماذا دليل عقار؟</span><h2>كل ما تحتاجه للوصول إلى العقار المناسب</h2><p>نرتّب البيانات بالطريقة الطبيعية التي تبحث بها: محافظة، منطقة، ثم عمارة، لتصل إلى المعلومة دون تشتيت.</p></div>
          <div className="features">
            <article><span><Map /></span><h3>تصفح منظّم</h3><p>دليل هرمي واضح يجعل الوصول إلى العقارات أسرع.</p></article>
            <article><span><Building2 /></span><h3>تفاصيل متكاملة</h3><p>صور ومواصفات وموقع ووسائل تواصل في صفحة واحدة.</p></article>
            <article><span><ShieldCheck /></span><h3>معلومات موثوقة</h3><p>عرض مرتب وواضح يساعدك على المقارنة واتخاذ القرار.</p></article>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
