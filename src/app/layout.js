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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>" />
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
