export default function DashboardPage() {
  return (
    <div className="page-container">
      {/* Ringkasan Statistik */}
      <div className="dashboard-section">
        <h1 className="dashboard-page-title">Ringkasan Dasbor</h1>
        <p className="dashboard-page-desc">Analisis data 7,043 pelanggan telekomunikasi secara langsung</p>
      </div>

      <div className="stats-grid-3">
        <div className="stat-card stat-card-total">
          <div className="stat-label">Total Pelanggan</div>
          <div className="stat-value">7,043</div>
          <div className="stat-sub">Basis data historis keseluruhan</div>
        </div>
        <div className="stat-card stat-card-danger">
          <div className="stat-label">Pelanggan Churn</div>
          <div className="stat-value">1,869</div>
          <div className="stat-change negative">26.5%</div>
        </div>
        <div className="stat-card stat-card-success">
          <div className="stat-label">Pelanggan Retained</div>
          <div className="stat-value">5,174</div>
          <div className="stat-change positive">73.5%</div>
        </div>
        <div className="stat-card stat-card-tenure">
          <div className="stat-label">Rata-rata Tenure</div>
          <div className="stat-value">
            32.4 <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-muted)', marginLeft: '4px' }}>bulan</span>
          </div>
        </div>
        <div className="stat-card stat-card-monthly">
          <div className="stat-label">Rata-rata Biaya Bulanan</div>
          <div className="stat-value">$64.76</div>
        </div>
        <div className="stat-card stat-card-total-charges">
          <div className="stat-label">Rata-rata Total Biaya</div>
          <div className="stat-value">$2,280</div>
        </div>
      </div>

      {/* Baris Pertama: 2 Kolom (Donut + Line Chart) */}
      <div className="chart-row">
        {/* Donut Chart: Distribusi Churn */}
        <div className="chart-card">
          <div className="chart-title">Distribusi Churn vs Retained</div>
          <div className="donut-container">
            <svg className="donut-svg" viewBox="0 0 200 200">
              <circle className="donut-bg" cx="100" cy="100" r="70" />
              <circle
                className="donut-fill donut-churn"
                cx="100" cy="100" r="70"
                strokeDasharray={`${26.5 * 4.398} ${(100 - 26.5) * 4.398}`}
                strokeDashoffset="110"
              />
            </svg>
            <div className="donut-center">
              <div className="donut-percent">26.5%</div>
              <div className="donut-label-text">Tingkat Churn</div>
            </div>
          </div>
          <div className="donut-legend">
            <div className="legend-item">
              <span className="legend-dot legend-dot-danger"></span>
              <span>Churned — 1,869 (26.5%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot legend-dot-success"></span>
              <span>Retained — 5,174 (73.5%)</span>
            </div>
          </div>

          <div className="line-chart-insight" style={{ marginTop: '24px' }}>
            <strong>Insight:</strong> Tingkat churn rata-rata adalah 26.5% (1,869 pelanggan). Mayoritas pelanggan (73.5%) berhasil dipertahankan sebagai pelanggan aktif (*retained*).
          </div>
        </div>

        {/* Line Chart: Tenure vs Churn */}
        <div className="chart-card">
          <div className="chart-title">Tren Pelanggan berdasarkan Lama Berlangganan (Tenure)</div>
          <div className="line-chart-container">
            <div className="line-chart-gridlines">
              <div className="gridline"><span className="gridline-val">1000</span></div>
              <div className="gridline"><span className="gridline-val">750</span></div>
              <div className="gridline"><span className="gridline-val">500</span></div>
              <div className="gridline"><span className="gridline-val">250</span></div>
              <div className="gridline"><span className="gridline-val">0</span></div>
            </div>
            
            <svg className="line-chart-svg" viewBox="0 0 500 180" width="100%" height="100%">
              {/* Lines */}
              <path
                className="line-chart-path line-chart-path-retained"
                d="M 50,84.0 L 89.1,116.4 L 128.2,127.8 L 167.3,129.5 L 206.4,132.6 L 245.5,135.7 L 284.5,138.4 L 323.6,134.9 L 362.7,130.5 L 401.8,129.4 L 440.9,121.0 L 480,54.6"
              />
              <path
                className="line-chart-path line-chart-path-churn"
                d="M 50,70.2 L 89.1,144.6 L 128.2,155.3 L 167.3,163.7 L 206.4,166.9 L 245.5,168.1 L 284.5,168.5 L 323.6,171.4 L 362.7,170.6 L 401.8,172.8 L 440.9,174.1 L 480,173.1"
              />

              {/* Retained Points */}
              <g>
                <circle cx="50" cy="84.0" className="line-chart-point line-chart-point-retained" />
                <circle cx="89.1" cy="116.4" className="line-chart-point line-chart-point-retained" />
                <circle cx="128.2" cy="127.8" className="line-chart-point line-chart-point-retained" />
                <circle cx="167.3" cy="129.5" className="line-chart-point line-chart-point-retained" />
                <circle cx="206.4" cy="132.6" className="line-chart-point line-chart-point-retained" />
                <circle cx="245.5" cy="135.7" className="line-chart-point line-chart-point-retained" />
                <circle cx="284.5" cy="138.4" className="line-chart-point line-chart-point-retained" />
                <circle cx="323.6" cy="134.9" className="line-chart-point line-chart-point-retained" />
                <circle cx="362.7" cy="130.5" className="line-chart-point line-chart-point-retained" />
                <circle cx="401.8" cy="129.4" className="line-chart-point line-chart-point-retained" />
                <circle cx="440.9" cy="121.0" className="line-chart-point line-chart-point-retained" />
                <circle cx="480" cy="54.6" className="line-chart-point line-chart-point-retained" />
              </g>

              {/* Churn Points */}
              <g>
                <circle cx="50" cy="70.2" className="line-chart-point line-chart-point-churn" />
                <circle cx="89.1" cy="144.6" className="line-chart-point line-chart-point-churn" />
                <circle cx="128.2" cy="155.3" className="line-chart-point line-chart-point-churn" />
                <circle cx="167.3" cy="163.7" className="line-chart-point line-chart-point-churn" />
                <circle cx="206.4" cy="166.9" className="line-chart-point line-chart-point-churn" />
                <circle cx="245.5" cy="168.1" className="line-chart-point line-chart-point-churn" />
                <circle cx="284.5" cy="168.5" className="line-chart-point line-chart-point-churn" />
                <circle cx="323.6" cy="171.4" className="line-chart-point line-chart-point-churn" />
                <circle cx="362.7" cy="170.6" className="line-chart-point line-chart-point-churn" />
                <circle cx="401.8" cy="172.8" className="line-chart-point line-chart-point-churn" />
                <circle cx="440.9" cy="174.1" className="line-chart-point line-chart-point-churn" />
                <circle cx="480" cy="173.1" className="line-chart-point line-chart-point-churn" />
              </g>
            </svg>
          </div>
          
          <div className="line-chart-axis-labels">
            <span>1-6 bln</span>
            <span>13-24 bln</span>
            <span>37-48 bln</span>
            <span>49-60 bln</span>
            <span>67-72 bln</span>
          </div>

          <div className="line-chart-legend">
            <div className="legend-item" style={{ margin: 0 }}>
              <span className="legend-dot legend-dot-danger"></span>
              <span>Churned (Pelanggan Berhenti)</span>
            </div>
            <div className="legend-item" style={{ margin: 0 }}>
              <span className="legend-dot legend-dot-success"></span>
              <span>Retained</span>
            </div>
          </div>

          <div className="line-chart-insight">
            <strong>Insight:</strong> Pelanggan baru biasanya lebih rentan churn. Risiko churn tertinggi berada pada 6 bulan pertama (52.9%) dan menurun drastis seiring bertambahnya lama berlangganan.
          </div>
        </div>
      </div>

      {/* Baris Kedua dan Seterusnya: 2 Grid per Baris */}
      <div className="chart-grid-3">
        {/* Card 1: Churn Rate by Contract Type */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Tipe Kontrak</div>
          <div className="bar-chart-vertical-stack">
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Bulanan (Month-to-month)</span>
                <span className="bar-count">1.655 / 3.875</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '42.7%' }}>
                  <span className="bar-value">42.7%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">1 Tahun (One year)</span>
                <span className="bar-count">166 / 1.473</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '11.3%' }}>
                  <span className="bar-value">11.3%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">2 Tahun (Two year)</span>
                <span className="bar-count">48 / 1.695</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '2.8%' }}>
                  <span className="bar-value">2.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Churn Rate by Internet Service */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Layanan Internet</div>
          <div className="bar-chart-vertical-stack">
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Serat Optik (Fiber optic)</span>
                <span className="bar-count">1.297 / 3.096</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.9%' }}>
                  <span className="bar-value">41.9%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">DSL</span>
                <span className="bar-count">459 / 2.421</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '19.0%' }}>
                  <span className="bar-value">19.0%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Tanpa Internet</span>
                <span className="bar-count">113 / 1.526</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '7.4%' }}>
                  <span className="bar-value">7.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Churn Rate by Gender */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Jenis Kelamin</div>
          <div className="bar-chart-vertical-stack">
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Perempuan (Female)</span>
                <span className="bar-count">939 / 3.488</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '26.9%' }}>
                  <span className="bar-value">26.9%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Laki-laki (Male)</span>
                <span className="bar-count">930 / 3.555</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-blue-soft" style={{ width: '26.2%' }}>
                  <span className="bar-value">26.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Churn Rate by Payment Method */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Metode Pembayaran</div>
          <div className="bar-chart-vertical-stack">
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Cek Elektronik (Electronic check)</span>
                <span className="bar-count">1.071 / 2.365</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '45.3%' }}>
                  <span className="bar-value">45.3%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Cek Fisik (Mailed check)</span>
                <span className="bar-count">308 / 1.612</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '19.1%' }}>
                  <span className="bar-value">19.1%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Transfer Bank (Bank transfer)</span>
                <span className="bar-count">258 / 1.544</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '16.7%' }}>
                  <span className="bar-value">16.7%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Kartu Kredit (Credit card)</span>
                <span className="bar-count">232 / 1.522</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '15.2%' }}>
                  <span className="bar-value">15.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Churn Rate by Tenure Group */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Kelompok Tenure</div>
          <div className="bar-chart-vertical-stack">
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">0–6 Bulan</span>
                <span className="bar-count">784 / 1.481</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '52.9%' }}>
                  <span className="bar-value">52.9%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">7–12 Bulan</span>
                <span className="bar-count">253 / 705</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '35.9%' }}>
                  <span className="bar-value">35.9%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">13–24 Bulan</span>
                <span className="bar-count">294 / 1.024</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '28.7%' }}>
                  <span className="bar-value">28.7%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">25–48 Bulan</span>
                <span className="bar-count">325 / 1.594</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '20.4%' }}>
                  <span className="bar-value">20.4%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">49–72 Bulan</span>
                <span className="bar-count">213 / 2.239</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '9.5%' }}>
                  <span className="bar-value">9.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Churn Rate by Demografi */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Demografi</div>
          <div className="bar-chart-vertical-stack">
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Lansia (Senior Citizen)</span>
                <span className="bar-count">476 / 1.142</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.7%' }}>
                  <span className="bar-value">41.7%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Bukan Lansia (Non-Senior)</span>
                <span className="bar-count">1.393 / 5.901</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '23.6%' }}>
                  <span className="bar-value">23.6%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Tanpa Pasangan (Tanpa Partner)</span>
                <span className="bar-count">1.200 / 3.641</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '33.0%' }}>
                  <span className="bar-value">33.0%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Memiliki Pasangan (Punya Partner)</span>
                <span className="bar-count">669 / 3.402</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '19.7%' }}>
                  <span className="bar-value">19.7%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Tagihan Elektronik (Paperless Billing)</span>
                <span className="bar-count">1.400 / 4.171</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '33.6%' }}>
                  <span className="bar-value">33.6%</span>
                </div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-info-row">
                <span className="bar-label">Tagihan Fisik (Non-Paperless)</span>
                <span className="bar-count">469 / 2.872</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '16.3%' }}>
                  <span className="bar-value">16.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
