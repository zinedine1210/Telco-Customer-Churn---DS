'use client';

import { useEffect, useState } from 'react';

export default function ResultCard({ result, onClose, onReset }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  const probability = result?.churn_probability || 0;
  const riskLevel = (result?.risk_level || 'low').toLowerCase();
  const prediction = result?.prediction || '';
  const recommendation = result?.recommendation || '';

  useEffect(() => {
    // Animate the gauge value
    const duration = 1500;
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

  return (
    <div className="result-overlay" onClick={onClose}>
      <div className="result-card" onClick={(e) => e.stopPropagation()}>
        <button className="result-close" onClick={onClose}>✕</button>

        <h2 className="result-title">Hasil Prediksi Churn</h2>

        {/* Gauge Meter */}
        <div className="gauge-container">
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

        <div className="gauge-label">Probabilitas Churn</div>

        {/* Risk Badge */}
        <div style={{ marginTop: '20px' }}>
          <span className={`risk-badge ${riskLevel}`}>
            Risiko {riskLevel === 'low' ? 'Rendah' : riskLevel === 'medium' ? 'Sedang' : 'Tinggi'}
          </span>
        </div>

        {/* Prediction */}
        <div className={`result-prediction ${prediction === 'Churn' ? 'churn' : 'not-churn'}`}>
          {prediction === 'Churn' ? 'Kemungkinan Churn' : 'Kemungkinan Tetap'}
        </div>

        {/* Recommendation */}
        <div className="result-recommendation">
          <div className="result-recommendation-title">
            Rekomendasi
          </div>
          {recommendation}
        </div>

        {/* Actions */}
        <div className="result-actions">
          <button className="result-btn primary" onClick={onReset}>
            Prediksi Lagi
          </button>
          <button className="result-btn secondary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
