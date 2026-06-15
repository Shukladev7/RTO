import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

interface Passport {
  passportId: string;
  productName: string;
  category: string;
  condition: string;
  currentStatus: string;
  eligibilityScore: number;
  currentLocation: { city: string; hub: string };
  currentOwner: string;
  ownershipHistory: Array<{ owner: string; from: string; to: string; date: string }>;
  lifecycleCount?: number;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  in_transit: { bg: '#FFF3CD', text: '#856404' },
  at_hub: { bg: '#D1ECF1', text: '#0C5460' },
  delivered: { bg: '#D4EDDA', text: '#155724' },
  return_initiated: { bg: '#F8D7DA', text: '#721C24' },
  routed: { bg: '#CCE5FF', text: '#004085' },
  reallocated: { bg: '#D4EDDA', text: '#155724' },
};

const CONDITION_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: '#D4EDDA', text: '#155724' },
  like_new: { bg: '#CCE5FF', text: '#004085' },
  good: { bg: '#FFF3CD', text: '#856404' },
  fair: { bg: '#F8D7DA', text: '#721C24' },
};

export default function PassportList() {
  const navigate = useNavigate();
  const [passports, setPassports] = useState<Passport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    async function fetchPassports() {
      try {
        const res = await apiClient.get('/passports');
        setPassports(res.data.passports || []);
      } catch {
        // silently fail for demo
      } finally {
        setLoading(false);
      }
    }
    fetchPassports();
  }, []);

  const filtered = passports.filter(p => {
    const matchesSearch = !searchTerm || p.productName.toLowerCase().includes(searchTerm.toLowerCase()) || p.passportId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.currentStatus === statusFilter;
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(passports.map(p => p.category))];
  const multiOwnerCount = passports.filter(p => (p.ownershipHistory?.length || 0) > 2).length;
  const avgLifecycle = passports.length > 0
    ? (passports.reduce((sum, p) => sum + (p.lifecycleCount || 1), 0) / passports.length).toFixed(1)
    : '0';

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F1111', margin: 0 }}>
          Product Passport Network
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#565959', marginTop: '0.25rem' }}>
          Digital lifecycle identity for every product
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Passports', value: passports.length.toString(), color: '#FF9900' },
          { label: 'Active Lifecycles', value: passports.filter(p => p.currentStatus !== 'delivered').length.toString(), color: '#004085' },
          { label: 'Multi-Owner Products', value: multiOwnerCount.toString(), color: '#155724' },
          { label: 'Avg Lifecycle Count', value: avgLifecycle, color: '#856404' },
        ].map((stat, idx) => (
          <div key={idx} style={{
            background: '#FFFFFF',
            borderRadius: 8,
            padding: '1.25rem',
            border: '1px solid #D5D9D9',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.78rem', color: '#565959', marginTop: '0.25rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 8,
        padding: '1rem 1.5rem',
        border: '1px solid #D5D9D9',
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <input
          type="text"
          placeholder="Search by product name or passport ID..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            padding: '0.5rem 0.75rem',
            border: '1px solid #D5D9D9',
            borderRadius: 4,
            fontSize: '0.85rem',
            outline: 'none',
          }}
          aria-label="Search passports"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: '0.5rem 0.75rem', border: '1px solid #D5D9D9', borderRadius: 4, fontSize: '0.85rem' }}
          aria-label="Filter by status"
        >
          <option value="all">All Statuses</option>
          <option value="reallocated">Reallocated</option>
          <option value="routed">Routed</option>
          <option value="at_hub">At Hub</option>
          <option value="return_initiated">Return Initiated</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          style={{ padding: '0.5rem 0.75rem', border: '1px solid #D5D9D9', borderRadius: 4, fontSize: '0.85rem' }}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Passport Grid */}
      {loading ? (
        <p style={{ color: '#565959', textAlign: 'center', padding: '2rem' }}>Loading passports...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: '#565959', textAlign: 'center', padding: '2rem' }}>No passports found matching your criteria.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {filtered.map(p => {
            const statusColor = STATUS_COLORS[p.currentStatus] || { bg: '#F0F2F2', text: '#0F1111' };
            const condColor = CONDITION_COLORS[p.condition] || { bg: '#F0F2F2', text: '#0F1111' };
            const lifecycle = p.lifecycleCount || 1;
            const lifecycleLabel = lifecycle === 1 ? '1st Life' : lifecycle === 2 ? '2nd Life' : `${lifecycle}rd Life`;
            return (
              <div
                key={p.passportId}
                onClick={() => navigate(`/passport/${p.passportId}`)}
                style={{
                  background: '#FFFFFF',
                  padding: '1.25rem',
                  border: '1px solid #D5D9D9',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'box-shadow 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0F1111' }}>{p.productName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#565959', marginTop: '0.15rem' }}>{p.passportId}</div>
                  </div>
                  <span style={{
                    padding: '0.15rem 0.5rem',
                    borderRadius: 10,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    background: statusColor.bg,
                    color: statusColor.text,
                    whiteSpace: 'nowrap',
                  }}>
                    {p.currentStatus.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span style={{
                    padding: '0.1rem 0.4rem',
                    borderRadius: 8,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    background: condColor.bg,
                    color: condColor.text,
                  }}>
                    {p.condition.replace(/_/g, ' ')}
                  </span>
                  <span style={{
                    padding: '0.1rem 0.4rem',
                    borderRadius: 8,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    background: '#FFF3CD',
                    color: '#856404',
                  }}>
                    {lifecycleLabel}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                  <span>Owners: {p.ownershipHistory?.length || 1}</span>
                  <span style={{ margin: '0 0.5rem' }}>|</span>
                  <span>{p.currentLocation.city}</span>
                  <span style={{ margin: '0 0.5rem' }}>|</span>
                  <span>Score: {p.eligibilityScore}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
