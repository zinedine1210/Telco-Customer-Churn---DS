'use client';

import { usePathname } from 'next/navigation';

const pageTitles = {
  '/': { title: 'Dashboard', breadcrumb: 'Ringkasan' },
  '/predict': { title: 'Prediksi Churn', breadcrumb: 'Analisis Pelanggan' },
  '/data': { title: 'Data Pelanggan', breadcrumb: 'Eksplorasi Data' },
  '/reports': { title: 'Laporan Analisis', breadcrumb: 'Hasil Laporan' },
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
