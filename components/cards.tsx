"use client";

import Link from "next/link";
import { ArrowLeft, Camera, MapPin, MapPinned } from "lucide-react";
import type { Area, Building, Governorate } from "@/lib/types";
import { useData } from "./data-provider";
import { Badge } from "./ui";

export function GovernorateCard({ item }: { item: Governorate }) {
  const { data } = useData();
  const areas = data.areas.filter((area) => area.governorateId === item.id);
  const buildings = data.buildings.filter((building) => building.governorateId === item.id);

  return (
    <Link href={`/governorates/${item.id}`} className="place-card" aria-label={`استكشف محافظة ${item.name}`}>
      <div className="card-image"><img src={item.image} alt={`صورة محافظة ${item.name}`} loading="lazy" /><span><MapPinned size={15} /> محافظة</span></div>
      <div className="card-body"><h3>{item.name}</h3><p>{item.description}</p><div className="card-stats"><span><b>{areas.length}</b> منطقة</span><span><b>{buildings.length}</b> عمارة</span></div><span className="card-link">استكشف المحافظة <ArrowLeft size={17} /></span></div>
    </Link>
  );
}

export function AreaCard({ item }: { item: Area }) {
  const { data } = useData();
  const count = data.buildings.filter((building) => building.areaId === item.id).length;

  return (
    <Link href={`/governorates/${item.governorateId}/areas/${item.id}`} className="place-card" aria-label={`عرض عمارات منطقة ${item.name}`}>
      <div className="card-image"><img src={item.image} alt={`صورة منطقة ${item.name}`} loading="lazy" /><span><MapPin size={15} /> منطقة</span></div>
      <div className="card-body"><h3>{item.name}</h3><p>{item.description}</p><div className="card-stats"><span><b>{count}</b> عمارة متاحة</span></div><span className="card-link">عرض العمارات <ArrowLeft size={17} /></span></div>
    </Link>
  );
}

export function BuildingCard({ item }: { item: Building }) {
  return (
    <Link href={`/buildings/${item.id}`} className="building-card" aria-label={`عرض تفاصيل ${item.name}`}>
      <div className="card-image"><img src={item.mainImage} alt={`الواجهة الرئيسية لـ ${item.name}`} loading="lazy" /><Badge tone={item.details.deliveryStatus === "جاهز للاستلام" ? "green" : "gold"}>{item.details.deliveryStatus}</Badge><span className="photo-count"><Camera size={14} />{item.images.length}</span></div>
      <div className="card-body"><h3>{item.name}</h3><p className="location-line"><MapPin size={15} />{item.address}</p><p>{item.description}</p><span className="card-link">عرض التفاصيل <ArrowLeft size={17} /></span></div>
    </Link>
  );
}
