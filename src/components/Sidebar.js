'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: '🏠', label: 'Beranda', description: 'Dashboard utama' },
    { href: '/predict', icon: '🔮', label: 'Prediksi Churn', description: 'Analisis pelanggan' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">📊</div>
        <div>
          <div className="sidebar-title">ChurnGuard</div>
          <div className="sidebar-subtitle">AI Analytics</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Menu Utama</div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${pathname === item.href ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
          </Link>
        ))}

        <div className="nav-label" style={{ marginTop: '24px' }}>Informasi</div>
        <div className="nav-item" style={{ cursor: 'default', opacity: 0.6 }}>
          <span className="nav-icon">📚</span>
          <span className="nav-text">Dataset Info</span>
        </div>
        <div className="nav-item" style={{ cursor: 'default', opacity: 0.6 }}>
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Model Settings</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          <div className="sidebar-avatar">A</div>
          <div>
            <div className="sidebar-user-name">Admin</div>
            <div className="sidebar-user-role">Data Analyst</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
