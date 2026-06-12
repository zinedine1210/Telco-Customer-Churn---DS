'use client';

import { useState, useEffect, useCallback } from 'react';

const COLUMNS = [
  { key: 'customerID', label: 'Customer ID', sortable: true },
  { key: 'gender', label: 'Gender', sortable: true },
  { key: 'SeniorCitizen', label: 'Senior', sortable: true },
  { key: 'Partner', label: 'Partner', sortable: true },
  { key: 'Dependents', label: 'Dependents', sortable: true },
  { key: 'tenure', label: 'Tenure', sortable: true },
  { key: 'PhoneService', label: 'Phone', sortable: true },
  { key: 'InternetService', label: 'Internet', sortable: true },
  { key: 'Contract', label: 'Contract', sortable: true },
  { key: 'PaperlessBilling', label: 'Paperless', sortable: true },
  { key: 'PaymentMethod', label: 'Payment', sortable: true },
  { key: 'MonthlyCharges', label: 'Monthly ($)', sortable: true },
  { key: 'TotalCharges', label: 'Total ($)', sortable: true },
  { key: 'Churn', label: 'Churn', sortable: true },
];

export default function DataPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage] = useState(20);

  // Filters
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterSenior, setFilterSenior] = useState('');
  const [filterContract, setFilterContract] = useState('');
  const [filterInternet, setFilterInternet] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [filterChurn, setFilterChurn] = useState('');

  // Sorting
  const [sortBy, setSortBy] = useState('');
  const [sortDir, setSortDir] = useState('asc');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      if (search) params.set('search', search);
      if (filterGender) params.set('gender', filterGender);
      if (filterSenior) params.set('senior', filterSenior);
      if (filterContract) params.set('contract', filterContract);
      if (filterInternet) params.set('internet', filterInternet);
      if (filterPayment) params.set('payment', filterPayment);
      if (filterChurn) params.set('churn', filterChurn);
      if (sortBy) {
        params.set('sort_by', sortBy);
        params.set('sort_dir', sortDir);
      }

      const res = await fetch(`/api/customers?${params.toString()}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const json = await res.json();
      setData(json.data || []);
      setTotal(json.total || 0);
      setTotalPages(json.total_pages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, search, filterGender, filterSenior, filterContract, filterInternet, filterPayment, filterChurn, sortBy, sortDir]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const clearFilters = () => {
    setSearch('');
    setFilterGender('');
    setFilterSenior('');
    setFilterContract('');
    setFilterInternet('');
    setFilterPayment('');
    setFilterChurn('');
    setSortBy('');
    setSortDir('asc');
    setPage(1);
  };

  const pageNumbers = [];
  const maxVisible = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="page-container">
      <div className="dashboard-section">
        <h1 className="dashboard-page-title">Data Explorer</h1>
        <p className="dashboard-page-desc">Jelajahi data {total.toLocaleString()} pelanggan telekomunikasi</p>
      </div>

      {/* Filters */}
      <div className="data-filters">
        <form onSubmit={handleSearchSubmit} className="filter-search">
          <input
            type="text"
            className="form-input"
            placeholder="Cari Customer ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search-input"
          />
        </form>

        <div className="filter-selects">
          <select className="form-select filter-select" value={filterGender} onChange={handleFilterChange(setFilterGender)} id="filter-gender">
            <option value="">Semua Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select className="form-select filter-select" value={filterSenior} onChange={handleFilterChange(setFilterSenior)} id="filter-senior">
            <option value="">Semua Usia</option>
            <option value="0">Non-Senior</option>
            <option value="1">Senior</option>
          </select>

          <select className="form-select filter-select" value={filterContract} onChange={handleFilterChange(setFilterContract)} id="filter-contract">
            <option value="">Semua Contract</option>
            <option value="Month-to-month">Month-to-month</option>
            <option value="One year">One year</option>
            <option value="Two year">Two year</option>
          </select>

          <select className="form-select filter-select" value={filterInternet} onChange={handleFilterChange(setFilterInternet)} id="filter-internet">
            <option value="">Semua Internet</option>
            <option value="DSL">DSL</option>
            <option value="Fiber optic">Fiber optic</option>
            <option value="No">Tidak ada</option>
          </select>

          <select className="form-select filter-select" value={filterPayment} onChange={handleFilterChange(setFilterPayment)} id="filter-payment">
            <option value="">Semua Payment</option>
            <option value="Electronic check">Electronic check</option>
            <option value="Mailed check">Mailed check</option>
            <option value="Bank transfer (automatic)">Bank transfer</option>
            <option value="Credit card (automatic)">Credit card</option>
          </select>

          <select className="form-select filter-select" value={filterChurn} onChange={handleFilterChange(setFilterChurn)} id="filter-churn">
            <option value="">Semua Status</option>
            <option value="Yes">Churn</option>
            <option value="No">Retained</option>
          </select>

          <button className="filter-clear-btn" onClick={clearFilters} type="button">
            Reset
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="data-error">
          Gagal memuat data: {error}. Pastikan backend sudah berjalan di port 8000.
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table" id="customer-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={col.sortable ? 'sortable' : ''}
                >
                  {col.label}
                  {sortBy === col.key && (
                    <span className="sort-indicator">{sortDir === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={COLUMNS.length} className="table-loading">Memuat data...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={COLUMNS.length} className="table-empty">Tidak ada data ditemukan</td></tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row.customerID || idx}>
                  {COLUMNS.map((col) => (
                    <td key={col.key} className={col.key === 'Churn' ? `churn-cell ${row[col.key] === 'Yes' ? 'churn-yes' : 'churn-no'}` : ''}>
                      {col.key === 'SeniorCitizen'
                        ? (row[col.key] === '1' ? 'Ya' : 'Tidak')
                        : row[col.key] || '-'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && data.length > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Menampilkan {((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)} dari {total.toLocaleString()} data
          </div>
          <div className="pagination-controls">
            <button
              className="page-btn"
              disabled={page <= 1}
              onClick={() => setPage(1)}
            >
              {'<<'}
            </button>
            <button
              className="page-btn"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              {'<'}
            </button>
            {pageNumbers.map((p) => (
              <button
                key={p}
                className={`page-btn ${p === page ? 'active' : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              {'>'}
            </button>
            <button
              className="page-btn"
              disabled={page >= totalPages}
              onClick={() => setPage(totalPages)}
            >
              {'>>'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
