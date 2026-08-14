import type { Metadata } from "next";
import { headers } from "next/headers";
import { DataProvider } from "@/components/data-provider";
import "./globals.css";
export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") || "localhost:3000";
  const origin = `${host.includes("localhost") ? "http" : "https"}://${host}`;
  const title = "دليل عقار | دليلك العقاري في مصر";
  const description = "اكتشف المحافظات والمناطق والعمارات وتعرّف على تفاصيل كل عقار وموقعه وبيانات التواصل.";
  return { title: { default: title, template: "%s | دليل عقار" }, description, icons: { icon: "/favicon.svg" }, openGraph: { title, description, locale: "ar_EG", type: "website", images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "دليل عقار" }] }, twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] } };
}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ar" dir="rtl"><body><DataProvider>{children}</DataProvider></body></html>}
