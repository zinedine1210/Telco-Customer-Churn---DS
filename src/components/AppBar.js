'use client';

import { usePathname } from 'next/navigation';

const pageTitles = {
  '/': { title: 'Beranda', breadcrumb: 'Dashboard' },
  '/predict': { title: 'Prediksi Churn', breadcrumb: 'Analisis Pelanggan' },
};

export default function AppBar() {
  const pathname = usePathname();
  const pageInfo = pageTitles[pathname] || { title: 'Page', breadcrumb: '' };

  return (
    <header className="appbar">
      <div className="appbar-left">
        <div className="appbar-breadcrumb">
          ChurnGuard / <span>{pageInfo.title}</span>
        </div>
      </div>
    </header>
  );
}
