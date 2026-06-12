'use client';

import { usePathname } from 'next/navigation';

const pageTitles = {
  '/': { title: 'Dashboard', breadcrumb: 'Overview' },
  '/predict': { title: 'Prediksi Churn', breadcrumb: 'Analisis Pelanggan' },
  '/data': { title: 'Data Explorer', breadcrumb: 'Tabel Data' },
  '/reports': { title: 'Reports', breadcrumb: 'Laporan Analisis' },
};

export default function AppBar() {
  const pathname = usePathname();
  const pageInfo = pageTitles[pathname] || { title: 'Page', breadcrumb: '' };

  return (
    <header className="appbar">
      <div className="appbar-left">
        <div className="appbar-breadcrumb">
          Telco Churn Analyzer / <span>{pageInfo.title}</span>
        </div>
      </div>
    </header>
  );
}
