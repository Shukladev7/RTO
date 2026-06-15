import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FilterTab = 'all' | 'ready_for_resale' | 'in_inspection' | 'sold';

interface ResaleProduct {
  id: string;
  passportId: string;
  name: string;
  category: string;
  grade: 'A' | 'B' | 'C';
  suggestedPrice: number;
  lifecycleCount: number;
  inspectionStatus: string;
  status: FilterTab;
}

const GRADE_COLORS: Record<string, { bg: string; text: string }> = {
  A: { bg: '#D4EDDA', text: '#155724' },
  B: { bg: '#FFF3CD', text: '#856404' },
  C: { bg: '#F8D7DA', text: '#721C24' },
};

const DEMO_PRODUCTS: ResaleProduct[] = [
  { id: '1', passportId: 'PP-1001', name: 'iPhone 15 Pro', category: 'Electronics', grade: 'A', suggestedPrice: 89999, lifecycleCount: 2, inspectionStatus: 'Certified', status: 'ready_for_resale' },
  { id: '2', passportId: 'PP-1002', name: 'Samsung Galaxy S24', category: 'Electronics', grade: 'A', suggestedPrice: 64999, lifecycleCount: 2, inspectionStatus: 'Certified', status: 'ready_for_resale' },
  { id: '3', passportId: 'PP-1003', name: 'AirPods Pro', category: 'Electronics', grade: 'B', suggestedPrice: 14999, lifecycleCount: 2, inspectionStatus: 'Certified', status: 'ready_for_resale' },
  { id: '4', passportId: 'PP-1004', name: 'MacBook Air M3', category: 'Electronics', grade: 'A', suggestedPrice: 94999, lifecycleCount: 3, inspectionStatus: 'Certified', status: 'sold' },
  { id: '5', passportId: 'PP-1005', name: 'Sony WH-1000XM5', category: 'Audio', grade: 'B', suggestedPrice: 18999, lifecycleCount: 2, inspectionStatus: 'In Progress', status: 'in_inspection' },
  { id: '6', passportId: 'PP-1006', name: 'Apple Watch Ultra', category: 'Electronics', grade: 'A', suggestedPrice: 54999, lifecycleCount: 3, inspectionStatus: 'Certified', status: 'ready_for_resale' },
  { id: '7', passportId: 'PP-1007', name: 'iPad Air', category: 'Electronics', grade: 'B', suggestedPrice: 44999, lifecycleCount: 2, inspectionStatus: 'In Progress', status: 'in_inspection' },
  { id: '8', passportId: 'PP-1008', name: 'Logitech MX Keys', category: 'Accessories', grade: 'A', suggestedPrice: 7999, lifecycleCount: 2, inspectionStatus: 'Certified', status: 'sold' },
  { id: '9', passportId: 'PP-1009', name: 'Dell Monitor 27"', category: 'Electronics', grade: 'C', suggestedPrice: 18999, lifecycleCount: 2, inspectionStatus: 'Pending', status: 'in_inspection' },
  { id: '10', passportId: 'PP-1010', name: 'JBL Flip 6', category: 'Audio', grade: 'A', suggestedPrice: 7499, lifecycleCount: 2, inspectionStatus: 'Certified', status: 'ready_for_resale' },
  { id: '11', passportId: 'PP-1011', name: 'Kindle Paperwhite', category: 'Electronics', grade: 'B', suggestedPrice: 9999, lifecycleCount: 2, inspectionStatus: 'Certified', status: 'sold' },
  { id: '12', passportId: 'PP-1012', name: 'Dyson V15', category: 'Home', grade: 'C', suggestedPrice: 34999, lifecycleCount: 2, inspectionStatus: 'In Progress', status: 'in_inspection' },
];

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ready_for_resale', label: 'Ready For Resale' },
  { key: 'in_inspection', label: 'In Inspection' },
  { key: 'sold', label: 'Sold' },
];

export default function ResaleMarketplace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filtered = activeTab === 'all' ? DEMO_PRODUCTS : DEMO_PRODUCTS.filter(p => p.status === activeTab);

  const stats = [
    { label: 'Products Listed', value: DEMO_PRODUCTS.filter(p => p.status === 'ready_for_resale').length.toString(), color: '#FF9900' },
    { label: 'Avg Resale Time', value: '3.2 days', color: '#004085' },
    { label: 'Resale Success Rate', value: '87%', color: '#155724' },
    { label: 'Revenue Generated', value: '\u20B924.8L', color: '#856404' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F1111', margin: 0 }}>
          Resale Marketplace
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#565959', marginTop: '0.25rem' }}>
          Certified pre-owned products ready for new owners
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {stats.map((stat, idx) => (
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

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 0,
        marginBottom: '1.5rem',
        borderBottom: '2px solid #D5D9D9',
      }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.key ? '3px solid #FF9900' : '3px solid transparent',
              fontWeight: activeTab === tab.key ? 600 : 400,
              fontSize: '0.88rem',
              color: activeTab === tab.key ? '#0F1111' : '#565959',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {filtered.map(product => {
          const gradeColor = GRADE_COLORS[product.grade] || { bg: '#F0F2F2', text: '#0F1111' };
          const lifecycleLabel = product.lifecycleCount === 2 ? '2nd Life' : `${product.lifecycleCount}rd Life`;
          return (
            <div key={product.id} style={{
              background: '#FFFFFF',
              borderRadius: 8,
              border: '1px solid #D5D9D9',
              overflow: 'hidden',
              transition: 'box-shadow 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* Image Placeholder */}
              <div style={{
                height: 120,
                background: '#F7F8F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                color: '#565959',
                borderBottom: '1px solid #D5D9D9',
              }}>
                {product.category} Product
              </div>

              <div style={{ padding: '1rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0F1111', marginBottom: '0.5rem' }}>
                  {product.name}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <span style={{
                    padding: '0.15rem 0.5rem',
                    borderRadius: 10,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    background: gradeColor.bg,
                    color: gradeColor.text,
                  }}>
                    Grade {product.grade}
                  </span>
                  <span style={{
                    padding: '0.15rem 0.5rem',
                    borderRadius: 10,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    background: '#FFF3CD',
                    color: '#856404',
                  }}>
                    {lifecycleLabel}
                  </span>
                  <span style={{
                    padding: '0.15rem 0.5rem',
                    borderRadius: 10,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    background: product.inspectionStatus === 'Certified' ? '#D4EDDA' : product.inspectionStatus === 'In Progress' ? '#CCE5FF' : '#F0F2F2',
                    color: product.inspectionStatus === 'Certified' ? '#155724' : product.inspectionStatus === 'In Progress' ? '#004085' : '#565959',
                  }}>
                    {product.inspectionStatus}
                  </span>
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#B12704', marginBottom: '0.75rem' }}>
                  {'\u20B9'}{product.suggestedPrice.toLocaleString('en-IN')}
                </div>

                <button
                  onClick={() => navigate(`/passport/${product.passportId}`)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: '#FF9900',
                    border: 'none',
                    borderRadius: 4,
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    color: '#0F1111',
                    cursor: 'pointer',
                    fontFamily: 'Arial, sans-serif',
                  }}
                >
                  View Passport
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
