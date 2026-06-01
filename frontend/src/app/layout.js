import './globals.css';
import Sidebar from '@/components/Sidebar';
import AppBar from '@/components/AppBar';

export const metadata = {
  title: 'ChurnGuard - Telco Customer Churn Prediction',
  description: 'AI-powered customer churn prediction system for telecommunications. Analyze customer data and predict churn probability to improve retention strategies.',
  keywords: 'churn prediction, customer retention, telco analytics, machine learning',
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
