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
        </div>
        <div className="stat-card stat-card-danger">
          <div className="stat-label">Pelanggan Churn</div>
          <div className="stat-value">1,869</div>
          <div className="stat-change negative">26.5%</div>
        </div>
        <div className="stat-card stat-card-success">
          <div className="stat-label">Pelanggan Bertahan (Retained)</div>
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
          <div className="chart-title">Distribusi Churn vs Bertahan</div>
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
              <span>Bertahan — 5,174 (73.5%)</span>
            </div>
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
              <span>Bertahan (Retained)</span>
            </div>
          </div>

          <div className="line-chart-insight">
            <strong>Insight:</strong> Pelanggan baru biasanya lebih rentan churn. Risiko churn tertinggi berada pada 6 bulan pertama (52.9%) dan menurun drastis seiring bertambahnya lama berlangganan.
          </div>
        </div>
      </div>

      {/* Baris Kedua dan Seterusnya: 3 Grid per Baris */}
      <div className="chart-grid-3">
        {/* Card 1: Churn Rate by Contract Type */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Tipe Kontrak</div>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Bulanan (Month-to-month)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '42.7%' }}>
                  <span className="bar-value">42.7%</span>
                </div>
              </div>
              <div className="bar-count">1.655 / 3.875</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">1 Tahun (One year)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '11.3%' }}>
                  <span className="bar-value">11.3%</span>
                </div>
              </div>
              <div className="bar-count">166 / 1.473</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">2 Tahun (Two year)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '2.8%' }}>
                  <span className="bar-value">2.8%</span>
                </div>
              </div>
              <div className="bar-count">48 / 1.695</div>
            </div>
          </div>
        </div>

        {/* Card 2: Churn Rate by Internet Service */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Layanan Internet</div>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Serat Optik (Fiber optic)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.9%' }}>
                  <span className="bar-value">41.9%</span>
                </div>
              </div>
              <div className="bar-count">1.297 / 3.096</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">DSL</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '19.0%' }}>
                  <span className="bar-value">19.0%</span>
                </div>
              </div>
              <div className="bar-count">459 / 2.421</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Internet</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '7.4%' }}>
                  <span className="bar-value">7.4%</span>
                </div>
              </div>
              <div className="bar-count">113 / 1.526</div>
            </div>
          </div>
        </div>

        {/* Card 3: Churn Rate by Gender */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Jenis Kelamin</div>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Perempuan (Female)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '26.9%' }}>
                  <span className="bar-value">26.9%</span>
                </div>
              </div>
              <div className="bar-count">939 / 3.488</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Laki-laki (Male)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '26.2%' }}>
                  <span className="bar-value">26.2%</span>
                </div>
              </div>
              <div className="bar-count">930 / 3.555</div>
            </div>
          </div>
        </div>

        {/* Card 4: Churn Rate by Payment Method */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Metode Pembayaran</div>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Cek Elektronik (Electronic check)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '45.3%' }}>
                  <span className="bar-value">45.3%</span>
                </div>
              </div>
              <div className="bar-count">1.071 / 2.365</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Cek Fisik (Mailed check)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '19.1%' }}>
                  <span className="bar-value">19.1%</span>
                </div>
              </div>
              <div className="bar-count">308 / 1.612</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Transfer Bank (Bank transfer)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '16.7%' }}>
                  <span className="bar-value">16.7%</span>
                </div>
              </div>
              <div className="bar-count">258 / 1.544</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Kartu Kredit (Credit card)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '15.2%' }}>
                  <span className="bar-value">15.2%</span>
                </div>
              </div>
              <div className="bar-count">232 / 1.522</div>
            </div>
          </div>
        </div>

        {/* Card 5: Churn Rate by Tenure Group */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Kelompok Tenure</div>
          <div className="column-chart-container">
            <div className="column-chart-gridlines">
              <div className="gridline"><span className="gridline-val">60%</span></div>
              <div className="gridline"><span className="gridline-val">40%</span></div>
              <div className="gridline"><span className="gridline-val">20%</span></div>
              <div className="gridline"><span className="gridline-val">0%</span></div>
            </div>
            <div className="column-chart" style={{ left: '32px' }}>
              <div className="column-item">
                <div className="column-track" style={{ width: '36px' }}>
                  <div className="column-fill column-fill-danger" style={{ height: '88.2%' }}>
                    <span className="column-value">52.9%</span>
                  </div>
                </div>
                <div className="column-label">0–6 bln</div>
                <div className="column-sub">784/1.481</div>
              </div>
              <div className="column-item">
                <div className="column-track" style={{ width: '36px' }}>
                  <div className="column-fill column-fill-danger" style={{ height: '59.8%' }}>
                    <span className="column-value">35.9%</span>
                  </div>
                </div>
                <div className="column-label">7–12 bln</div>
                <div className="column-sub">253/705</div>
              </div>
              <div className="column-item">
                <div className="column-track" style={{ width: '36px' }}>
                  <div className="column-fill column-fill-warning" style={{ height: '47.8%' }}>
                    <span className="column-value">28.7%</span>
                  </div>
                </div>
                <div className="column-label">13–24 bln</div>
                <div className="column-sub">294/1.024</div>
              </div>
              <div className="column-item">
                <div className="column-track" style={{ width: '36px' }}>
                  <div className="column-fill column-fill-info" style={{ height: '34.0%' }}>
                    <span className="column-value">20.4%</span>
                  </div>
                </div>
                <div className="column-label">25–48 bln</div>
                <div className="column-sub">325/1.594</div>
              </div>
              <div className="column-item">
                <div className="column-track" style={{ width: '36px' }}>
                  <div className="column-fill column-fill-success" style={{ height: '15.8%' }}>
                    <span className="column-value">9.5%</span>
                  </div>
                </div>
                <div className="column-label">49–72 bln</div>
                <div className="column-sub">213/2.239</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Churn Rate by Demografi */}
        <div className="chart-card">
          <div className="chart-title">Tingkat Churn berdasarkan Demografi</div>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Lansia (Senior Citizen)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.7%' }}>
                  <span className="bar-value">41.7%</span>
                </div>
              </div>
              <div className="bar-count">476 / 1.142</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Bukan Lansia (Non-Senior)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '23.6%' }}>
                  <span className="bar-value">23.6%</span>
                </div>
              </div>
              <div className="bar-count">1.393 / 5.901</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Pasangan (Tanpa Partner)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '33.0%' }}>
                  <span className="bar-value">33.0%</span>
                </div>
              </div>
              <div className="bar-count">1.200 / 3.641</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Memiliki Pasangan (Punya Partner)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '19.7%' }}>
                  <span className="bar-value">19.7%</span>
                </div>
              </div>
              <div className="bar-count">669 / 3.402</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Tagihan Elektronik (Paperless)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '33.6%' }}>
                  <span className="bar-value">33.6%</span>
                </div>
              </div>
              <div className="bar-count">1.400 / 4.171</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Tagihan Fisik (Non-Paperless)</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '16.3%' }}>
                  <span className="bar-value">16.3%</span>
                </div>
              </div>
              <div className="bar-count">469 / 2.872</div>
            </div>
          </div>
        </div>

        {/* Card 7: Churn Rate by Online Security & Backup */}
        <div className="chart-card">
          <div className="chart-title">Keamanan & Cadangan Layanan Online</div>
          <div className="bar-chart" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="bar-section-label" style={{ fontSize: '11px', marginTop: '2px' }}>Keamanan Online (Online Security)</div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Keamanan</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.8%' }}>
                  <span className="bar-value">41.8%</span>
                </div>
              </div>
              <div className="bar-count">1.461 / 3.498</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Dengan Keamanan</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '14.6%' }}>
                  <span className="bar-value">14.6%</span>
                </div>
              </div>
              <div className="bar-count">295 / 2.019</div>
            </div>

            <div className="bar-section-label" style={{ fontSize: '11px', marginTop: '8px' }}>Cadangan Online (Online Backup)</div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Cadangan</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '39.9%' }}>
                  <span className="bar-value">39.9%</span>
                </div>
              </div>
              <div className="bar-count">1.233 / 3.088</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Dengan Cadangan</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '21.5%' }}>
                  <span className="bar-value">21.5%</span>
                </div>
              </div>
              <div className="bar-count">523 / 2.429</div>
            </div>
          </div>
        </div>

        {/* Card 8: Churn Rate by Tech Support & Device Protection */}
        <div className="chart-card">
          <div className="chart-title">Dukungan Teknis & Perlindungan Perangkat</div>
          <div className="bar-chart" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="bar-section-label" style={{ fontSize: '11px', marginTop: '2px' }}>Dukungan Teknis (Tech Support)</div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Dukungan</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.6%' }}>
                  <span className="bar-value">41.6%</span>
                </div>
              </div>
              <div className="bar-count">1.446 / 3.473</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Dengan Dukungan</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '15.2%' }}>
                  <span className="bar-value">15.2%</span>
                </div>
              </div>
              <div className="bar-count">310 / 2.044</div>
            </div>

            <div className="bar-section-label" style={{ fontSize: '11px', marginTop: '8px' }}>Proteksi Perangkat (Device Protection)</div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Proteksi</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '39.1%' }}>
                  <span className="bar-value">39.1%</span>
                </div>
              </div>
              <div className="bar-count">1.211 / 3.095</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Dengan Proteksi</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '22.5%' }}>
                  <span className="bar-value">22.5%</span>
                </div>
              </div>
              <div className="bar-count">545 / 2.422</div>
            </div>
          </div>
        </div>

        {/* Card 9: Churn Rate by Streaming services */}
        <div className="chart-card">
          <div className="chart-title">Layanan Hiburan & Streaming</div>
          <div className="bar-chart" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="bar-section-label" style={{ fontSize: '11px', marginTop: '2px' }}>Streaming TV</div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Streaming TV</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '33.5%' }}>
                  <span className="bar-value">33.5%</span>
                </div>
              </div>
              <div className="bar-count">942 / 2.810</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Dengan Streaming TV</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '30.1%' }}>
                  <span className="bar-value">30.1%</span>
                </div>
              </div>
              <div className="bar-count">814 / 2.707</div>
            </div>

            <div className="bar-section-label" style={{ fontSize: '11px', marginTop: '8px' }}>Streaming Film (Movies)</div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Streaming Film</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '33.7%' }}>
                  <span className="bar-value">33.7%</span>
                </div>
              </div>
              <div className="bar-count">938 / 2.785</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Dengan Streaming Film</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '29.9%' }}>
                  <span className="bar-value">29.9%</span>
                </div>
              </div>
              <div className="bar-count">818 / 2.732</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
