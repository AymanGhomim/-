"use client";

import Link from "next/link";
import { Building2, ChevronLeft, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark"><Building2 size={23} /></span>
      <div className="brand-copy"><b>دليل<span>عقار</span></b><small>دليلك العقاري</small></div>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    ["الرئيسية", "/"],
    ["المحافظات", "/governorates"],
    ["المناطق", "/governorates/gov-1"],
    ["العمارات", "/governorates/gov-1/areas/area-1"],
    ["عن الدليل", "/#about"],
  ];

  const isActive = (href: string) => href === "/" ? pathname === "/" : !href.includes("#") && pathname === href;

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand />
        <nav id="main-navigation" className={open ? "nav-links open" : "nav-links"} aria-label="التنقل الرئيسي">
          <div className="nav-page-links">
            {links.map(([label, href]) => (
              <Link key={label} href={href} className={isActive(href) ? "active" : ""} aria-current={isActive(href) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
            ))}
          </div>
          <Link className="mobile-admin" href="/admin/login" onClick={() => setOpen(false)}><span>دخول الإدارة</span><ChevronLeft size={16} /></Link>
        </nav>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <button className="nav-backdrop" onClick={() => setOpen(false)} aria-label="إغلاق القائمة" />}
    </header>
  );
}
