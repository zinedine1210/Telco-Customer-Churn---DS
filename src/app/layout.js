import './globals.css';
import Sidebar from '@/components/Sidebar';
import AppBar from '@/components/AppBar';

export const metadata = {
  title: 'Telco Churn Analyzer — Customer Churn Analysis Dashboard',
  description: 'Dashboard analisis customer churn untuk perusahaan telekomunikasi. Eksplorasi data pelanggan, prediksi churn, dan temukan insight untuk strategi retensi.',
  keywords: 'churn analysis, customer retention, telco analytics, machine learning, data mining',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/logo_telco_churn.png" />
      </head>
      <body>
        <div className="app-layout">
          <Sidebar />
          <div className="main-content">
            <AppBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
