'use client';

import { useEffect, useState } from 'react';

export default function ResultCard({ result, formData, onReset }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  const probability = result?.churn_probability || 0;
  const riskLevel = (result?.risk_level || 'low').toLowerCase();
  const prediction = result?.prediction || '';
  const recommendation = result?.recommendation || '';

  useEffect(() => {
    // Animate the gauge value
    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(probability * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [probability]);

  // Gauge SVG calculations
  const radius = 80;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (animatedValue / 100) * circumference;

  // Dynamically calculate risk and retention factors based on input features
  const factors = [];

  if (formData) {
    // 1. Contract
    if (formData.Contract === 'Month-to-month') {
      factors.push({
        type: 'risk',
        title: 'Kontrak Month-to-month',
        description: 'Tipe kontrak bulanan memiliki korelasi tertinggi dengan churn rate sebesar 42.7%.'
      });
    } else if (formData.Contract === 'Two year') {
      factors.push({
        type: 'retention',
        title: 'Kontrak Dua Tahun',
        description: 'Menawarkan perlindungan retensi terbaik dengan churn rate sangat rendah (2.8%).'
      });
    } else if (formData.Contract === 'One year') {
      factors.push({
        type: 'retention',
        title: 'Kontrak Satu Tahun',
        description: 'Membantu menstabilkan loyalitas pelanggan dengan rata-rata churn rate 11.3%.'
      });
    }

    // 2. Tenure
    if (formData.tenure <= 6) {
      factors.push({
        type: 'risk',
        title: `Tenure Baru (${formData.tenure} bulan)`,
        description: 'Pelanggan pada 6 bulan pertama berada pada periode kritis dengan churn rate 52.9%.'
      });
    } else if (formData.tenure >= 49) {
      factors.push({
        type: 'retention',
        title: `Pelanggan Setia (${formData.tenure} bulan)`,
        description: 'Tenure jangka panjang (4 tahun+) menunjukkan loyalitas tinggi dengan churn rate hanya 9.5%.'
      });
    }

    // 3. Payment Method
    if (formData.PaymentMethod === 'Electronic check') {
      factors.push({
        type: 'risk',
        title: 'Metode Electronic Check',
        description: 'Metode non-otomatis ini mendominasi kasus churn dengan tingkat churn rate 45.3%.'
      });
    } else if (formData.PaymentMethod?.includes('automatic')) {
      factors.push({
        type: 'retention',
        title: 'Auto-Pay Terintegrasi',
        description: 'Metode pembayaran otomatis mengurangi gesekan billing dengan churn rate ~15-16%.'
      });
    }

    // 4. Internet Service
    if (formData.InternetService === 'Fiber optic') {
      factors.push({
        type: 'risk',
        title: 'Layanan Internet Fiber Optic',
        description: 'Memiliki churn rate tinggi (41.9%), sering terkait biaya bulanan tinggi atau ketidakpuasan performa.'
      });
    } else if (formData.InternetService === 'No') {
      factors.push({
        type: 'retention',
        title: 'Hanya Layanan Telepon',
        description: 'Pelanggan tanpa paket internet cenderung stabil dan loyal (churn rate 7.4%).'
      });
    }

    // 5. Senior Citizen
    if (formData.SeniorCitizen === 1) {
      factors.push({
        type: 'risk',
        title: 'Kategori Senior Citizen',
        description: 'Pelanggan usia lanjut memiliki churn rate lebih tinggi (41.7%) dibanding rata-rata.'
      });
    }

    // 6. Security & Tech Support
    if (formData.InternetService !== 'No') {
      if (formData.OnlineSecurity === 'No') {
        factors.push({
          type: 'risk',
          title: 'Tanpa Online Security',
          description: 'Ketiadaan fitur proteksi tambahan mengurangi keterikatan pelanggan terhadap produk.'
        });
      } else if (formData.OnlineSecurity === 'Yes') {
        factors.push({
          type: 'retention',
          title: 'Menggunakan Online Security',
          description: 'Keamanan ekstra meningkatkan kenyamanan dan retensi pengguna internet.'
        });
      }

      if (formData.TechSupport === 'No') {
        factors.push({
          type: 'risk',
          title: 'Tanpa Tech Support',
          description: 'Tidak adanya dukungan teknis langsung meningkatkan risiko churn saat terjadi kendala.'
        });
      } else if (formData.TechSupport === 'Yes') {
        factors.push({
          type: 'retention',
          title: 'Menggunakan Tech Support',
          description: 'Bantuan teknis yang sigap menjaga loyalitas pelanggan saat ada hambatan jaringan.'
        });
      }
    }

    // 7. Dependents & Partner
    if (formData.Partner === 'No' && formData.Dependents === 'No') {
      factors.push({
        type: 'risk',
        title: 'Lajang & Tanpa Tanggungan',
        description: 'Pelanggan mandiri cenderung lebih sensitif terhadap penawaran kompetitor (churn rate 33.0%).'
      });
    } else if (formData.Partner === 'Yes' || formData.Dependents === 'Yes') {
      factors.push({
        type: 'retention',
        title: 'Profil Keluarga',
        description: 'Pelanggan dengan keluarga/pasangan cenderung menetap lebih lama (churn rate ~19.7%).'
      });
    }
  }

  return (
    <div className="predict-result-card">
      <h2 className="predict-result-title">Hasil Analisis Prediksi Churn</h2>

      {/* Overview Row: Gauge & Main Status */}
      <div className="predict-result-overview">
        <div className="gauge-container" style={{ margin: '0' }}>
          <svg className="gauge-svg" viewBox="0 0 200 110">
            <path
              className="gauge-bg"
              d="M 20 100 A 80 80 0 0 1 180 100"
            />
            <path
              className={`gauge-fill ${riskLevel}`}
              d="M 20 100 A 80 80 0 0 1 180 100"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className={`gauge-value ${riskLevel}`}>
            {animatedValue.toFixed(1)}%
          </div>
        </div>

        <div className="predict-overview-info">
          <div className="gauge-label">Probabilitas Churn</div>
          <div style={{ marginTop: '8px' }}>
            <span className={`risk-badge ${riskLevel}`} style={{ marginBottom: '8px', padding: '6px 16px', fontSize: '13px' }}>
              Risiko {riskLevel === 'low' ? 'Rendah' : riskLevel === 'medium' ? 'Sedang' : 'Tinggi'}
            </span>
          </div>
          <div className={`result-prediction ${prediction === 'Churn' ? 'churn' : 'not-churn'}`} style={{ fontSize: '18px' }}>
            {prediction === 'Churn' ? 'Prediksi: Churn' : 'Prediksi: Retained (Tetap)'}
          </div>
        </div>
      </div>

      {/* Recommendation Block */}
      <div className="result-recommendation" style={{ margin: '0 0 20px', padding: '12px 16px' }}>
        <div className="result-recommendation-title" style={{ fontSize: '12px', marginBottom: '4px' }}>
          Rekomendasi Tindakan
        </div>
        <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>{recommendation}</p>
      </div>

      {/* Input Features Summary */}
      <div className="analysis-box" style={{ marginBottom: '20px', padding: '16px' }}>
        <h3 className="analysis-box-title" style={{ fontSize: '13px', marginBottom: '10px' }}>
          Detail Input Pelanggan
        </h3>
        <div className="features-summary-grid" style={{ gap: '10px', fontSize: '12px' }}>
          <div className="feature-summary-item">
            <span className="feat-lbl">Gender / Usia:</span>
            <span className="feat-val">{formData.gender === 'Male' ? 'Laki-laki' : 'Perempuan'} / {formData.SeniorCitizen === 1 ? 'Senior' : 'Muda'}</span>
          </div>
          <div className="feature-summary-item">
            <span className="feat-lbl">Tenure:</span>
            <span className="feat-val">{formData.tenure} bulan</span>
          </div>
          <div className="feature-summary-item">
            <span className="feat-lbl">Kontrak:</span>
            <span className="feat-val">{formData.Contract}</span>
          </div>
          <div className="feature-summary-item">
            <span className="feat-lbl">Metode Bayar:</span>
            <span className="feat-val">{formData.PaymentMethod}</span>
          </div>
          <div className="feature-summary-item">
            <span className="feat-lbl">Internet Service:</span>
            <span className="feat-val">{formData.InternetService}</span>
          </div>
          <div className="feature-summary-item">
            <span className="feat-lbl">Security / Support:</span>
            <span className="feat-val">{formData.OnlineSecurity === 'Yes' ? 'Ada' : 'Tidak'} / {formData.TechSupport === 'Yes' ? 'Ada' : 'Tidak'}</span>
          </div>
          <div className="feature-summary-item">
            <span className="feat-lbl">Tagihan Bulanan:</span>
            <span className="feat-val">${formData.MonthlyCharges.toFixed(2)}</span>
          </div>
          <div className="feature-summary-item">
            <span className="feat-lbl">Total Akumulasi:</span>
            <span className="feat-val">${formData.TotalCharges.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Factors List */}
      <div className="analysis-box" style={{ padding: '16px' }}>
        <h3 className="analysis-box-title" style={{ fontSize: '13px', marginBottom: '10px' }}>
          Faktor Risiko & Retensi Kunci
        </h3>
        <div className="factors-list" style={{ gap: '10px' }}>
          {factors.map((factor, idx) => (
            <div key={idx} className={`factor-item ${factor.type}`} style={{ padding: '10px', gap: '10px' }}>
              <span className="factor-icon" style={{ width: '20px', height: '20px', fontSize: '12px' }}>
                {factor.type === 'risk' ? '⚠️' : '✓'}
              </span>
              <div className="factor-details">
                <div className="factor-title" style={{ fontSize: '12px' }}>{factor.title}</div>
                <div className="factor-desc" style={{ fontSize: '11px', lineHeight: '1.3' }}>{factor.description}</div>
              </div>
            </div>
          ))}
          {factors.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', fontStyle: 'italic', padding: '4px' }}>
              Tidak ditemukan faktor risiko khusus yang signifikan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
