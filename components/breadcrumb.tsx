import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) { return <nav className="breadcrumb" aria-label="مسار التنقل"><Link href="/" aria-label="الرئيسية"><Home size={16}/></Link>{items.map((item, i) => <span key={`${item.label}-${i}`}><ChevronLeft size={14}/>{item.href ? <Link href={item.href}>{item.label}</Link> : <b>{item.label}</b>}</span>)}</nav>; }
