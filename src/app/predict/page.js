'use client';

import { useState } from 'react';
import ResultCard from '@/components/ResultCard';

const initialFormData = {
  gender: 'Male',
  SeniorCitizen: 0,
  Partner: 'No',
  Dependents: 'No',
  tenure: 12,
  PhoneService: 'Yes',
  MultipleLines: 'No',
  InternetService: 'DSL',
  OnlineSecurity: 'No',
  OnlineBackup: 'No',
  DeviceProtection: 'No',
  TechSupport: 'No',
  StreamingTV: 'No',
  StreamingMovies: 'No',
  Contract: 'Month-to-month',
  PaperlessBilling: 'Yes',
  PaymentMethod: 'Electronic check',
  MonthlyCharges: 50.0,
  TotalCharges: 600.0,
};

export default function PredictPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'SeniorCitizen'
          ? parseInt(value)
          : name === 'tenure'
          ? parseInt(value) || 0
          : name === 'MonthlyCharges' || name === 'TotalCharges'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memproses prediksi.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData(initialFormData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-container">
      <div className="predict-header">
        <h1 className="predict-title">Prediksi Customer Churn</h1>
        <p className="predict-subtitle">
          Isi data pelanggan di bawah ini untuk menganalisis risiko churn secara langsung.
        </p>
      </div>

      <div className="predict-split-container">
        {/* Left Column: Form */}
        <div className="predict-form-side">
          <form onSubmit={handleSubmit}>
            {/* Section 1: Demografis */}
            <div className="form-section">
              <div className="form-section-header">
                <div>
                  <div className="form-section-title">Informasi Demografis</div>
                  <div className="form-section-desc">Data pribadi pelanggan</div>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male (Laki-laki)</option>
                    <option value="Female">Female (Perempuan)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="seniorCitizen">Senior Citizen</label>
                  <select
                    id="seniorCitizen"
                    className="form-select"
                    name="SeniorCitizen"
                    value={formData.SeniorCitizen}
                    onChange={handleChange}
                  >
                    <option value={0}>Tidak (Usia &lt; 65)</option>
                    <option value={1}>Ya (Usia ≥ 65)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="partner">Partner</label>
                  <select
                    id="partner"
                    className="form-select"
                    name="Partner"
                    value={formData.Partner}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="dependents">Dependents</label>
                  <select
                    id="dependents"
                    className="form-select"
                    name="Dependents"
                    value={formData.Dependents}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Layanan Telepon */}
            <div className="form-section">
              <div className="form-section-header">
                <div>
                  <div className="form-section-title">Layanan Telepon</div>
                  <div className="form-section-desc">Layanan telepon yang digunakan</div>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="phoneService">Phone Service</label>
                  <select
                    id="phoneService"
                    className="form-select"
                    name="PhoneService"
                    value={formData.PhoneService}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="multipleLines">Multiple Lines</label>
                  <select
                    id="multipleLines"
                    className="form-select"
                    name="MultipleLines"
                    value={formData.MultipleLines}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                    <option value="No phone service">Tidak ada layanan telepon</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Layanan Internet */}
            <div className="form-section">
              <div className="form-section-header">
                <div>
                  <div className="form-section-title">Layanan Internet</div>
                  <div className="form-section-desc">Layanan internet dan fitur tambahan</div>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="internetService">Internet Service</label>
                  <select
                    id="internetService"
                    className="form-select"
                    name="InternetService"
                    value={formData.InternetService}
                    onChange={handleChange}
                  >
                    <option value="DSL">DSL</option>
                    <option value="Fiber optic">Fiber Optic</option>
                    <option value="No">Tidak ada</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="onlineSecurity">Online Security</label>
                  <select
                    id="onlineSecurity"
                    className="form-select"
                    name="OnlineSecurity"
                    value={formData.OnlineSecurity}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                    <option value="No internet service">Tidak ada internet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="onlineBackup">Online Backup</label>
                  <select
                    id="onlineBackup"
                    className="form-select"
                    name="OnlineBackup"
                    value={formData.OnlineBackup}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                    <option value="No internet service">Tidak ada internet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="deviceProtection">Device Protection</label>
                  <select
                    id="deviceProtection"
                    className="form-select"
                    name="DeviceProtection"
                    value={formData.DeviceProtection}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                    <option value="No internet service">Tidak ada internet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="techSupport">Tech Support</label>
                  <select
                    id="techSupport"
                    className="form-select"
                    name="TechSupport"
                    value={formData.TechSupport}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                    <option value="No internet service">Tidak ada internet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="streamingTV">Streaming TV</label>
                  <select
                    id="streamingTV"
                    className="form-select"
                    name="StreamingTV"
                    value={formData.StreamingTV}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                    <option value="No internet service">Tidak ada internet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="streamingMovies">Streaming Movies</label>
                  <select
                    id="streamingMovies"
                    className="form-select"
                    name="StreamingMovies"
                    value={formData.StreamingMovies}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                    <option value="No internet service">Tidak ada internet</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Informasi Akun */}
            <div className="form-section">
              <div className="form-section-header">
                <div>
                  <div className="form-section-title">Informasi Akun</div>
                  <div className="form-section-desc">Detail kontrak dan pembayaran</div>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="tenure">Tenure (bulan)</label>
                  <input
                    id="tenure"
                    className="form-input"
                    type="number"
                    name="tenure"
                    min="0"
                    max="72"
                    value={formData.tenure}
                    onChange={handleChange}
                    placeholder="Jumlah bulan berlangganan"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contract">Contract</label>
                  <select
                    id="contract"
                    className="form-select"
                    name="Contract"
                    value={formData.Contract}
                    onChange={handleChange}
                  >
                    <option value="Month-to-month">Bulanan (Month-to-month)</option>
                    <option value="One year">1 Tahun</option>
                    <option value="Two year">2 Tahun</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="paperlessBilling">Paperless Billing</label>
                  <select
                    id="paperlessBilling"
                    className="form-select"
                    name="PaperlessBilling"
                    value={formData.PaperlessBilling}
                    onChange={handleChange}
                  >
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="paymentMethod">Payment Method</label>
                  <select
                    id="paymentMethod"
                    className="form-select"
                    name="PaymentMethod"
                    value={formData.PaymentMethod}
                    onChange={handleChange}
                  >
                    <option value="Electronic check">Electronic Check</option>
                    <option value="Mailed check">Mailed Check</option>
                    <option value="Bank transfer (automatic)">Bank Transfer (Otomatis)</option>
                    <option value="Credit card (automatic)">Credit Card (Otomatis)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="monthlyCharges">Monthly Charges ($)</label>
                  <input
                    id="monthlyCharges"
                    className="form-input"
                    type="number"
                    name="MonthlyCharges"
                    min="0"
                    step="0.01"
                    value={formData.MonthlyCharges}
                    onChange={handleChange}
                    placeholder="Biaya bulanan"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="totalCharges">Total Charges ($)</label>
                  <input
                    id="totalCharges"
                    className="form-input"
                    type="number"
                    name="TotalCharges"
                    min="0"
                    step="0.01"
                    value={formData.TotalCharges}
                    onChange={handleChange}
                    placeholder="Total biaya"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                padding: '16px 20px',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '12px',
                color: '#DC2626',
                fontSize: '14px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="submit-container">
              <button
                type="submit"
                className={`submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Memproses...
                  </>
                ) : (
                  'Prediksi Sekarang'
                )}
              </button>
              {result && (
                <button
                  type="button"
                  className="filter-clear-btn"
                  onClick={handleReset}
                  style={{
                    padding: '14px 28px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Reset Form
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Prediction Result / Placeholder */}
        <div className="predict-result-side">
          {result ? (
            <ResultCard
              result={result}
              formData={formData}
              onReset={handleReset}
            />
          ) : (
            <div className="predict-placeholder-card">
              <div className="placeholder-icon">📊</div>
              <h3>Belum Ada Hasil Prediksi</h3>
              <p>
                Isi formulir data pelanggan di sebelah kiri, kemudian klik tombol <strong>Prediksi Sekarang</strong> di bawah untuk memproses dan menganalisis probabilitas churn pelanggan secara real-time di panel ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
