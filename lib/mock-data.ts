import type { AppData, Area, Building, Governorate } from "./types";

const photos = [
  "photo-1486406146926-c627a92ad1ab", "photo-1524230572899-a752b3835840",
  "photo-1600585154340-be6161a56a0c", "photo-1600566753190-17f0baa2a6c3",
  "photo-1600607687939-ce8a6c25118c", "photo-1600607687920-4e2a09cf159d",
  "photo-1600566753086-00f18fb6b3ea", "photo-1600573472550-8090b5e0745e",
  "photo-1600585152915-d208bec867a1", "photo-1600047509807-ba8f99d2cdde",
  "photo-1600210492486-724fe5c67fb0", "photo-1600607688969-a5bfcd646154",
  "photo-1600566753051-f0b89df2dd90", "photo-1600607688960-e095ff83135c",
  "photo-1600596542815-ffad4c1539a9", "photo-1564013799919-ab600027ffc6",
];
const image = (index: number, w = 1200) => `https://images.unsplash.com/${photos[index % photos.length]}?auto=format&fit=crop&w=${w}&q=82`;

const governorateNames = ["القاهرة","الجيزة","الإسكندرية","الدقهلية","الغربية","الشرقية","القليوبية","البحيرة","المنوفية","كفر الشيخ","دمياط","بورسعيد","الإسماعيلية","السويس","الفيوم","بني سويف","المنيا","أسيوط","سوهاج","قنا","الأقصر","أسوان","البحر الأحمر","الوادي الجديد","مطروح"];
export const initialGovernorates: Governorate[] = governorateNames.map((name, i) => ({
  id: `gov-${i + 1}`, name, slug: `governorate-${i + 1}`, image: image(i),
  description: `اكتشف أبرز المناطق والمشروعات العقارية في محافظة ${name}.`, status: "published",
}));

const areaNames: Record<string, string[]> = {
  "gov-1": ["التجمع الخامس","مدينة نصر","الشروق","مدينتي","العبور","حدائق أكتوبر"],
  "gov-2": ["الشيخ زايد","السادس من أكتوبر","المهندسين","الدقي"],
  "gov-3": ["سموحة","سيدي جابر","العجمي"],
  "gov-4": ["المنصورة","طلخا"],
  "gov-5": ["طنطا","المحلة الكبرى"],
  "gov-6": ["الزقازيق","العاشر من رمضان"],
};
let areaCounter = 1;
export const initialAreas: Area[] = Object.entries(areaNames).flatMap(([governorateId, names]) => names.map((name, i) => ({
  id: `area-${areaCounter++}`, governorateId, name, slug: `area-${areaCounter - 1}`,
  image: image(i + Number(governorateId.split("-")[1]) + 2),
  description: `دليل العمارات السكنية والمشروعات المميزة في ${name}.`, status: "published" as const,
})));

const buildingNames = ["دار مصر - القرنفل","سكن مصر","جنة مصر","عمارات النخيل","روضة القاهرة","أبراج الياسمين","بوابة زايد","سكاي ريزيدنس","أبراج سموحة","دار المنصورة"];
export const initialBuildings: Building[] = buildingNames.map((name, i) => {
  const area = initialAreas[i % initialAreas.length];
  const imgs = Array.from({ length: 15 }, (_, x) => image(i + x));
  return {
    id: `building-${i + 1}`, governorateId: area.governorateId, areaId: area.id, name,
    slug: `building-${i + 1}`, mainImage: imgs[0], images: imgs,
    description: "عمارة سكنية حديثة بتصميم راقٍ، قريبة من الخدمات والمحاور الرئيسية وتوفر تجربة سكن متكاملة.",
    address: `المجاورة ${i + 1}، الحي السكني المتميز`,
    details: { propertyType: "عمارة سكنية", floors: 7 + (i % 5), units: 28 + i * 4, area: `${145 + i * 5} – ${220 + i * 8} م²`, rooms: 3, bathrooms: 2, finishing: i % 2 ? "نصف تشطيب" : "تشطيب كامل", deliveryStatus: i % 3 ? "جاهز للاستلام" : "قيد الإنشاء" },
    location: { address: `المجاورة ${i + 1}، الحي السكني المتميز`, googleMapsUrl: "https://maps.google.com/?q=30.0444,31.2357", latitude: 30.0444, longitude: 31.2357 },
    contact: { phone: "+20 100 555 0188", whatsapp: "201005550188" },
    notes: "العمارة قريبة من الخدمات والمواصلات والمدارس، والوحدات تتميز بواجهات عصرية وتوزيع داخلي عملي.",
    status: "published", createdAt: "2026-05-12", updatedAt: `2026-08-${String(14 - (i % 8)).padStart(2, "0")}`,
  };
});

export const initialData: AppData = { governorates: initialGovernorates, areas: initialAreas, buildings: initialBuildings };
