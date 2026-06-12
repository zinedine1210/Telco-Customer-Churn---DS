export default function ReportsPage() {
  return (
    <div className="page-container">
      <div className="dashboard-section">
        <h1 className="dashboard-page-title">Reports</h1>
        <p className="dashboard-page-desc">Laporan analisis berdasarkan dataset 7,043 pelanggan telekomunikasi</p>
      </div>

      {/* Section 1: Key Findings */}
      <div className="report-section">
        <h2 className="report-section-title">Key Findings</h2>
        <p className="report-section-desc">Temuan utama dari analisis data customer churn</p>

        <div className="findings-list">
          <div className="finding-item">
            <div className="finding-number">1</div>
            <div className="finding-content">
              <h3>Tenure adalah faktor paling berpengaruh terhadap churn</h3>
              <p>Pelanggan dengan tenure 0–6 bulan memiliki churn rate <strong>52.9%</strong>, hampir 6x lipat dibanding pelanggan 49–72 bulan yang hanya <strong>9.5%</strong>. Ini menunjukkan bahwa 6 bulan pertama adalah masa kritis retensi.</p>
            </div>
          </div>

          <div className="finding-item">
            <div className="finding-number">2</div>
            <div className="finding-content">
              <h3>Tipe kontrak sangat mempengaruhi churn</h3>
              <p>Pelanggan dengan kontrak <strong>month-to-month memiliki churn rate 42.7%</strong>, sedangkan kontrak one year hanya 11.3% dan two year hanya <strong>2.8%</strong>. Kontrak jangka panjang secara signifikan mengurangi risiko churn.</p>
            </div>
          </div>

          <div className="finding-item">
            <div className="finding-number">3</div>
            <div className="finding-content">
              <h3>Fiber optic memiliki churn rate tertinggi di antara layanan internet</h3>
              <p>Pelanggan fiber optic memiliki churn rate <strong>41.9%</strong>, jauh lebih tinggi dari DSL (19.0%) dan tanpa internet (7.4%). Kemungkinan penyebabnya adalah biaya yang lebih tinggi atau ekspektasi kualitas layanan yang tidak terpenuhi.</p>
            </div>
          </div>

          <div className="finding-item">
            <div className="finding-number">4</div>
            <div className="finding-content">
              <h3>Electronic check sebagai metode pembayaran memiliki churn tertinggi</h3>
              <p>Churn rate untuk electronic check adalah <strong>45.3%</strong>, hampir 3x lipat dibanding metode pembayaran otomatis lainnya (~15-17%). Pelanggan yang tidak menggunakan auto-pay cenderung lebih mudah berpindah.</p>
            </div>
          </div>

          <div className="finding-item">
            <div className="finding-number">5</div>
            <div className="finding-content">
              <h3>Senior citizen memiliki risiko churn hampir 2x lipat</h3>
              <p>Churn rate senior citizen mencapai <strong>41.7%</strong>, dibandingkan non-senior yang hanya <strong>23.6%</strong>. Dari 1,142 pelanggan senior, 476 di antaranya churn.</p>
            </div>
          </div>

          <div className="finding-item">
            <div className="finding-number">6</div>
            <div className="finding-content">
              <h3>Pelanggan tanpa partner lebih rentan churn</h3>
              <p>Pelanggan tanpa partner memiliki churn rate <strong>33.0%</strong>, sedangkan yang punya partner hanya <strong>19.7%</strong>. Pelanggan yang memiliki ikatan keluarga cenderung lebih stabil.</p>
            </div>
          </div>

          <div className="finding-item">
            <div className="finding-number">7</div>
            <div className="finding-content">
              <h3>Paperless billing berkorelasi dengan churn lebih tinggi</h3>
              <p>Pelanggan dengan paperless billing memiliki churn rate <strong>33.6%</strong>, sedangkan yang non-paperless hanya <strong>16.3%</strong>. Kemungkinan karena pelanggan paperless kurang aware terhadap tagihan mereka.</p>
            </div>
          </div>

          <div className="finding-item">
            <div className="finding-number">8</div>
            <div className="finding-content">
              <h3>Gender tidak berpengaruh signifikan terhadap churn</h3>
              <p>Churn rate laki-laki (<strong>26.2%</strong>) dan perempuan (<strong>26.9%</strong>) hampir identik, menunjukkan bahwa gender bukan faktor yang mempengaruhi keputusan churn.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Model Performance */}
      <div className="report-section">
        <h2 className="report-section-title">Model Performance</h2>
        <p className="report-section-desc">Performa model machine learning yang digunakan untuk prediksi churn</p>

        <div className="model-stats-grid">
          <div className="model-stat">
            <div className="model-stat-label">Model</div>
            <div className="model-stat-value">Random Forest Classifier</div>
          </div>
          <div className="model-stat">
            <div className="model-stat-label">Akurasi</div>
            <div className="model-stat-value">79.8%</div>
          </div>
          <div className="model-stat">
            <div className="model-stat-label">Jumlah Fitur</div>
            <div className="model-stat-value">19 fitur</div>
          </div>
          <div className="model-stat">
            <div className="model-stat-label">Dataset</div>
            <div className="model-stat-value">7,043 records</div>
          </div>
          <div className="model-stat">
            <div className="model-stat-label">Churn Rate</div>
            <div className="model-stat-value">26.5%</div>
          </div>
          <div className="model-stat">
            <div className="model-stat-label">Algoritma</div>
            <div className="model-stat-value">Ensemble (Multi-tree)</div>
          </div>
        </div>

        <div className="model-features">
          <h3>Fitur yang Digunakan</h3>
          <div className="feature-tags">
            {[
              'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'tenure',
              'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity',
              'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV',
              'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod',
              'MonthlyCharges', 'TotalCharges'
            ].map((f) => (
              <span key={f} className="feature-tag">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Rekomendasi Bisnis */}
      <div className="report-section">
        <h2 className="report-section-title">Rekomendasi Bisnis</h2>
        <p className="report-section-desc">Strategi yang direkomendasikan untuk mengurangi customer churn</p>

        <div className="recommendations-list">
          <div className="recommendation-item recommendation-high">
            <div className="recommendation-priority">Prioritas Tinggi</div>
            <h3>Fokus retensi di 6 bulan pertama</h3>
            <p>Implementasikan program onboarding khusus untuk pelanggan baru. Berikan welcome bonus, check-in rutin, dan dedicated support selama 6 bulan pertama. Churn rate di periode ini mencapai 52.9% — menurunkannya akan berdampak signifikan.</p>
          </div>

          <div className="recommendation-item recommendation-high">
            <div className="recommendation-priority">Prioritas Tinggi</div>
            <h3>Dorong pelanggan ke kontrak jangka panjang</h3>
            <p>Tawarkan insentif menarik (diskon, upgrade gratis) bagi pelanggan month-to-month untuk beralih ke kontrak 1 atau 2 tahun. Churn rate kontrak 2 tahun hanya 2.8% vs 42.7% untuk bulanan.</p>
          </div>

          <div className="recommendation-item recommendation-high">
            <div className="recommendation-priority">Prioritas Tinggi</div>
            <h3>Dorong penggunaan auto-pay</h3>
            <p>Pelanggan electronic check memiliki churn 45.3%. Berikan insentif (diskon bulanan kecil) untuk beralih ke bank transfer atau credit card otomatis yang hanya 15-17% churn rate.</p>
          </div>

          <div className="recommendation-item recommendation-medium">
            <div className="recommendation-priority">Prioritas Sedang</div>
            <h3>Audit kualitas layanan Fiber optic</h3>
            <p>Dengan churn rate 41.9%, pelanggan fiber optic kemungkinan tidak puas dengan value-for-money. Lakukan survei kepuasan, evaluasi kecepatan aktual vs yang dijanjikan, dan pertimbangkan penyesuaian harga.</p>
          </div>

          <div className="recommendation-item recommendation-medium">
            <div className="recommendation-priority">Prioritas Sedang</div>
            <h3>Program khusus senior citizen</h3>
            <p>Buat paket layanan yang disesuaikan untuk senior citizen dengan antarmuka yang lebih sederhana, dukungan teknis prioritas, dan harga khusus. Churn rate senior citizen mencapai 41.7%.</p>
          </div>

          <div className="recommendation-item recommendation-low">
            <div className="recommendation-priority">Prioritas Rendah</div>
            <h3>Evaluasi program paperless billing</h3>
            <p>Pelanggan paperless memiliki churn rate 33.6% vs 16.3% non-paperless. Pertimbangkan untuk menambahkan notifikasi tagihan yang lebih jelas dan reminder pembayaran untuk pelanggan paperless.</p>
          </div>
        </div>
      </div>

      {/* Section 4: Data Summary */}
      <div className="report-section">
        <h2 className="report-section-title">Ringkasan Dataset</h2>
        <p className="report-section-desc">Statistik deskriptif dari dataset Telco Customer Churn</p>

        <div className="summary-table-wrapper">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Breakdown</th>
                <th>Jumlah</th>
                <th>Churn Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Contract</td><td>Month-to-month</td><td>3,875</td><td>42.7%</td></tr>
              <tr><td>Contract</td><td>One year</td><td>1,473</td><td>11.3%</td></tr>
              <tr><td>Contract</td><td>Two year</td><td>1,695</td><td>2.8%</td></tr>
              <tr className="table-separator"><td colSpan="4"></td></tr>
              <tr><td>Internet</td><td>Fiber optic</td><td>3,096</td><td>41.9%</td></tr>
              <tr><td>Internet</td><td>DSL</td><td>2,421</td><td>19.0%</td></tr>
              <tr><td>Internet</td><td>No internet</td><td>1,526</td><td>7.4%</td></tr>
              <tr className="table-separator"><td colSpan="4"></td></tr>
              <tr><td>Payment</td><td>Electronic check</td><td>2,365</td><td>45.3%</td></tr>
              <tr><td>Payment</td><td>Mailed check</td><td>1,612</td><td>19.1%</td></tr>
              <tr><td>Payment</td><td>Bank transfer</td><td>1,544</td><td>16.7%</td></tr>
              <tr><td>Payment</td><td>Credit card</td><td>1,522</td><td>15.2%</td></tr>
              <tr className="table-separator"><td colSpan="4"></td></tr>
              <tr><td>Gender</td><td>Male</td><td>3,555</td><td>26.2%</td></tr>
              <tr><td>Gender</td><td>Female</td><td>3,488</td><td>26.9%</td></tr>
              <tr className="table-separator"><td colSpan="4"></td></tr>
              <tr><td>Age</td><td>Non-Senior</td><td>5,901</td><td>23.6%</td></tr>
              <tr><td>Age</td><td>Senior Citizen</td><td>1,142</td><td>41.7%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
