export default function DashboardPage() {
  return (
    <div className="page-container">
      {/* Stats Overview */}
      <div className="dashboard-section">
        <h1 className="dashboard-page-title">Dashboard Overview</h1>
        <p className="dashboard-page-desc">Ringkasan data 7,043 pelanggan telekomunikasi</p>
      </div>

      <div className="stats-grid-3">
        <div className="stat-card stat-card-total">
          <div className="stat-label">Total Pelanggan</div>
          <div className="stat-value">7,043</div>
        </div>
        <div className="stat-card stat-card-danger">
          <div className="stat-label">Churned</div>
          <div className="stat-value">1,869</div>
          <div className="stat-change negative">26.5%</div>
        </div>
        <div className="stat-card stat-card-success">
          <div className="stat-label">Retained</div>
          <div className="stat-value">5,174</div>
          <div className="stat-change positive">73.5%</div>
        </div>
        <div className="stat-card stat-card-tenure">
          <div className="stat-label">Avg Tenure</div>
          <div className="stat-value">32.4 <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-muted)', marginLeft: '4px' }}>bulan</span></div>
        </div>
        <div className="stat-card stat-card-monthly">
          <div className="stat-label">Avg Monthly Charges</div>
          <div className="stat-value">$64.76</div>
        </div>
        <div className="stat-card stat-card-total-charges">
          <div className="stat-label">Avg Total Charges</div>
          <div className="stat-value">$2,280</div>
        </div>
      </div>

      {/* Charts Row 1: Donut + Contract */}
      {/* Charts Row 1: Donut (Churn) + Pie (Gender) */}
      <div className="chart-row">
        {/* Donut Chart: Churn Distribution */}
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
              <div className="donut-label-text">Churn Rate</div>
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
        </div>

        {/* Pie Chart: Gender Distribution */}
        <div className="chart-card">
          <div className="chart-title">Distribusi Pelanggan Berdasarkan Gender</div>
          <div className="gender-pie-layout">
            <div className="pie-chart-wrapper">
              <div className="pie-chart" style={{ background: 'conic-gradient(#E9A7B3 0% 50.5%, #FED7E2 50.5% 100%)' }}>
                <div className="pie-center">
                  <div className="pie-total">7,043</div>
                  <div className="pie-total-lbl">Pelanggan</div>
                </div>
              </div>
            </div>
            
            <div className="gender-details-list">
              <div className="gender-detail-item">
                <div className="gender-color-dot" style={{ backgroundColor: '#E9A7B3' }}></div>
                <div className="gender-info-text">
                  <span className="gender-name">Laki-laki (Male)</span>
                  <span className="gender-count"><strong>3,555</strong> (50.5%)</span>
                  <span className="gender-churn-rate">Churn: <strong className="txt-danger">26.2%</strong> (930)</span>
                </div>
              </div>
              <div className="gender-detail-item">
                <div className="gender-color-dot" style={{ backgroundColor: '#FED7E2' }}></div>
                <div className="gender-info-text">
                  <span className="gender-name">Perempuan (Female)</span>
                  <span className="gender-count"><strong>3,488</strong> (49.5%)</span>
                  <span className="gender-churn-rate">Churn: <strong className="txt-danger">26.9%</strong> (939)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2: Contract + Internet */}
      <div className="chart-row">
        {/* Bar Chart: Churn Rate by Contract */}
        <div className="chart-card">
          <div className="chart-title">Churn Rate by Contract Type</div>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Month-to-month</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '42.7%' }}>
                  <span className="bar-value">42.7%</span>
                </div>
              </div>
              <div className="bar-count">1,655 / 3,875</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">One year</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '11.3%' }}>
                  <span className="bar-value">11.3%</span>
                </div>
              </div>
              <div className="bar-count">166 / 1,473</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Two year</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '2.8%' }}>
                  <span className="bar-value">2.8%</span>
                </div>
              </div>
              <div className="bar-count">48 / 1,695</div>
            </div>
          </div>
        </div>

        {/* Bar Chart: Churn Rate by Internet Service */}
        <div className="chart-card">
          <div className="chart-title">Churn Rate by Internet Service</div>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Fiber optic</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.9%' }}>
                  <span className="bar-value">41.9%</span>
                </div>
              </div>
              <div className="bar-count">1,297 / 3,096</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">DSL</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '19.0%' }}>
                  <span className="bar-value">19.0%</span>
                </div>
              </div>
              <div className="bar-count">459 / 2,421</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">No internet</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '7.4%' }}>
                  <span className="bar-value">7.4%</span>
                </div>
              </div>
              <div className="bar-count">113 / 1,526</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 3: Payment + Demographics */}
      <div className="chart-row">
        {/* Bar Chart: Churn Rate by Payment Method */}
        <div className="chart-card">
          <div className="chart-title">Churn Rate by Payment Method</div>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Electronic check</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '45.3%' }}>
                  <span className="bar-value">45.3%</span>
                </div>
              </div>
              <div className="bar-count">1,071 / 2,365</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Mailed check</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '19.1%' }}>
                  <span className="bar-value">19.1%</span>
                </div>
              </div>
              <div className="bar-count">308 / 1,612</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Bank transfer</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '16.7%' }}>
                  <span className="bar-value">16.7%</span>
                </div>
              </div>
              <div className="bar-count">258 / 1,544</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Credit card</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '15.2%' }}>
                  <span className="bar-value">15.2%</span>
                </div>
              </div>
              <div className="bar-count">232 / 1,522</div>
            </div>
          </div>
        </div>

        {/* Bar Chart: Churn Rate by Demografi */}
        <div className="chart-card">
          <div className="chart-title">Churn Rate by Demografi</div>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Senior Citizen</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.7%' }}>
                  <span className="bar-value">41.7%</span>
                </div>
              </div>
              <div className="bar-count">476 / 1,142</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Non-Senior</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '23.6%' }}>
                  <span className="bar-value">23.6%</span>
                </div>
              </div>
              <div className="bar-count">1,393 / 5,901</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Partner</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '33.0%' }}>
                  <span className="bar-value">33.0%</span>
                </div>
              </div>
              <div className="bar-count">1,200 / 3,641</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Punya Partner</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-info" style={{ width: '19.7%' }}>
                  <span className="bar-value">19.7%</span>
                </div>
              </div>
              <div className="bar-count">669 / 3,402</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Paperless Billing</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-warning" style={{ width: '33.6%' }}>
                  <span className="bar-value">33.6%</span>
                </div>
              </div>
              <div className="bar-count">1,400 / 4,171</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Non-Paperless</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '16.3%' }}>
                  <span className="bar-value">16.3%</span>
                </div>
              </div>
              <div className="bar-count">469 / 2,872</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 4: Tenure (Vertical column chart) + Tech Support/Security */}
      <div className="chart-row">
        {/* Vertical Column Bar Chart: Tenure */}
        <div className="chart-card">
          <div className="chart-title">Churn Rate by Tenure Group</div>
          <div className="column-chart-container">
            <div className="column-chart-gridlines">
              <div className="gridline"><span className="gridline-val">60%</span></div>
              <div className="gridline"><span className="gridline-val">40%</span></div>
              <div className="gridline"><span className="gridline-val">20%</span></div>
              <div className="gridline"><span className="gridline-val">0%</span></div>
            </div>
            <div className="column-chart">
              <div className="column-item">
                <div className="column-track">
                  <div className="column-fill column-fill-danger" style={{ height: '88.2%' }}>
                    <span className="column-value">52.9%</span>
                  </div>
                </div>
                <div className="column-label">0–6 bln</div>
                <div className="column-sub">784 / 1,481</div>
              </div>
              <div className="column-item">
                <div className="column-track">
                  <div className="column-fill column-fill-danger" style={{ height: '59.8%' }}>
                    <span className="column-value">35.9%</span>
                  </div>
                </div>
                <div className="column-label">7–12 bln</div>
                <div className="column-sub">253 / 705</div>
              </div>
              <div className="column-item">
                <div className="column-track">
                  <div className="column-fill column-fill-warning" style={{ height: '47.8%' }}>
                    <span className="column-value">28.7%</span>
                  </div>
                </div>
                <div className="column-label">13–24 bln</div>
                <div className="column-sub">294 / 1,024</div>
              </div>
              <div className="column-item">
                <div className="column-track">
                  <div className="column-fill column-fill-info" style={{ height: '34.0%' }}>
                    <span className="column-value">20.4%</span>
                  </div>
                </div>
                <div className="column-label">25–48 bln</div>
                <div className="column-sub">325 / 1,594</div>
              </div>
              <div className="column-item">
                <div className="column-track">
                  <div className="column-fill column-fill-success" style={{ height: '15.8%' }}>
                    <span className="column-value">9.5%</span>
                  </div>
                </div>
                <div className="column-label">49–72 bln</div>
                <div className="column-sub">213 / 2,239</div>
              </div>
            </div>
          </div>
        </div>

        {/* Churn Rate by Tech Support & Security */}
        <div className="chart-card">
          <div className="chart-title">Dampak Layanan Keamanan & Dukungan Teknis</div>
          <div className="bar-chart" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="bar-section-label" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Online Security</div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Security</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.8%' }}>
                  <span className="bar-value">41.8%</span>
                </div>
              </div>
              <div className="bar-count">1,461 / 3,498</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Dengan Security</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '14.6%' }}>
                  <span className="bar-value">14.6%</span>
                </div>
              </div>
              <div className="bar-count">295 / 2,019</div>
            </div>
            
            <div className="bar-section-label" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '8px' }}>Tech Support</div>
            <div className="bar-row">
              <div className="bar-label">Tanpa Support</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-danger" style={{ width: '41.6%' }}>
                  <span className="bar-value">41.6%</span>
                </div>
              </div>
              <div className="bar-count">1,446 / 3,473</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Dengan Support</div>
              <div className="bar-track">
                <div className="bar-fill bar-fill-success" style={{ width: '15.2%' }}>
                  <span className="bar-value">15.2%</span>
                </div>
              </div>
              <div className="bar-count">310 / 2,044</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
