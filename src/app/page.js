import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-welcome-badge">
          Selamat Datang di ChurnGuard
        </div>

        <h1 className="home-title">
          Prediksi <span className="home-title-gradient">Customer Churn</span>
          <br />dengan Machine Learning
        </h1>

        <p className="home-subtitle">
          Analisis data pelanggan telekomunikasi menggunakan model Random Forest.
          Identifikasi pelanggan yang berisiko churn dan ambil tindakan preventif
          untuk meningkatkan retensi pelanggan.
        </p>

        <Link href="/predict" className="home-cta">
          Mulai Prediksi
          <span>→</span>
        </Link>
      </section>

      {/* Stats */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">7,043</div>
          <div className="stat-label">Total Data Pelanggan</div>
          <div className="stat-change positive">Dataset lengkap</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">26.5%</div>
          <div className="stat-label">Rata-rata Churn Rate</div>
          <div className="stat-change negative">Perlu perhatian</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">79.8%</div>
          <div className="stat-label">Akurasi Model</div>
          <div className="stat-change positive">Random Forest</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">19</div>
          <div className="stat-label">Fitur Analisis</div>
          <div className="stat-change positive">Komprehensif</div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Fitur Unggulan</h2>
        <p className="section-subtitle">
          Sistem prediksi churn untuk membantu keputusan bisnis Anda
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-card-title">Analisis Komprehensif</h3>
            <p className="feature-card-desc">
              Menganalisis 19 fitur pelanggan termasuk data demografis, layanan yang digunakan,
              dan informasi akun untuk prediksi yang akurat.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-card-title">Prediksi Real-time</h3>
            <p className="feature-card-desc">
              Dapatkan hasil prediksi churn secara instan dengan probabilitas persentase
              dan tingkat risiko yang jelas untuk setiap pelanggan.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-card-title">Rekomendasi Aksi</h3>
            <p className="feature-card-desc">
              Sistem memberikan rekomendasi aksi berdasarkan tingkat risiko churn
              untuk membantu strategi retensi pelanggan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
