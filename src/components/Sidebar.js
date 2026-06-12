'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/predict', label: 'Prediksi' },
    { href: '/data', label: 'Data' },
    { href: '/reports', label: 'Laporan' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src="/logo_telco_churn.png" alt="Logo" className="sidebar-logo-img" />
        <div>
          <div className="sidebar-title">Telco Churn Analyzer</div>
          <div className="sidebar-subtitle">CUSTOMER CHURN ANALYSIS</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Menu</div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${pathname === item.href ? 'active' : ''}`}
          >
            <span className="nav-text">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          <span className="sidebar-footer-text">Kelompok 1 — Data Mining</span>
        </div>
      </div>
    </aside>
  );
}
