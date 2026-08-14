"use client";
import Link from "next/link";
import { Building2, Menu, X, ChevronLeft } from "lucide-react";
import { useState } from "react";
export function Brand({ light = false }: { light?: boolean }) { return <Link href="/" className={`brand ${light ? "brand-light" : ""}`}><span><Building2 size={23}/></span><b>دليل<span>عقار</span></b></Link>; }
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [["الرئيسية","/"],["المحافظات","/governorates"],["المناطق","/governorates/gov-1"],["العمارات","/governorates/gov-1/areas/area-1"],["عن الدليل","/#about"]];
  return <header className="site-header"><div className="container nav-inner"><Brand/><nav className={open ? "nav-links open" : "nav-links"} aria-label="التنقل الرئيسي">{links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="mobile-admin" href="/admin/login">دخول الإدارة <ChevronLeft size={16}/></Link></nav><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}>{open ? <X/> : <Menu/>}</button></div></header>;
}
