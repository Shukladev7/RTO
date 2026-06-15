import { useState } from 'react';

interface InspectionChecklist {
  physical: boolean | null;
  accessories: boolean | null;
  battery: boolean | null;
  cosmetic: boolean | null;
  authenticity: boolean | null;
}

interface InspectionCase {
  id: string;
  passportId: string;
  productName: string;
  category: string;
  dateReceived: string;
  checklist: InspectionChecklist;
  grade: 'A' | 'B' | 'C';
  certified: boolean;
}

const GRADE_COLORS: Record<string, { bg: string; text: string }> = {
  A: { bg: '#D4EDDA', text: '#155724' },
  B: { bg: '#FFF3CD', text: '#856404' },
  C: { bg: '#F8D7DA', text: '#721C24' },
};

const initialCases: InspectionCase[] = [
  {
    id: '1',
    passportId: 'PP-1005',
    productName: 'Sony WH-1000XM5',
    category: 'Audio',
    dateReceived: '2024-01-18',
    checklist: { physical: true, accessories: true, battery: true, cosmetic: true, authenticity: true },
    grade: 'A',
    certified: false,
  },
  {
    id: '2',
    passportId: 'PP-1007',
    productName: 'iPad Air',
    category: 'Electronics',
    dateReceived: '2024-01-17',
    checklist: { physical: true, accessories: false, battery: true, cosmetic: true, authenticity: true },
    grade: 'B',
    certified: false,
  },
  {
    id: '3',
    passportId: 'PP-1009',
    productName: 'Dell Monitor 27"',
    category: 'Electronics',
    dateReceived: '2024-01-16',
    checklist: { physical: true, accessories: true, battery: null, cosmetic: false, authenticity: true },
    grade: 'C',
    certified: false,
  },
  {
    id: '4',
    passportId: 'PP-1012',
    productName: 'Dyson V15',
    category: 'Home',
    dateReceived: '2024-01-15',
    checklist: { physical: true, accessories: true, battery: true, cosmetic: true, authenticity: true },
    grade: 'A',
    certified: false,
  },
  {
    id: '5',
    passportId: 'PP-1016',
    productName: 'Boat Rockerz 550',
    category: 'Audio',
    dateReceived: '2024-01-14',
    checklist: { physical: true, accessories: true, battery: true, cosmetic: false, authenticity: true },
    grade: 'B',
    certified: false,
  },
];

export default function InspectionCenter() {
  const [cases, setCases] = useState<InspectionCase[]>(initialCases);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, certified: true } : c));
  };

  const checkLabel = (val: boolean | null): { text: string; color: string } => {
    if (val === true) return { text: 'PASS', color: '#155724' };
    if (val === false) return { text: 'FAIL', color: '#721C24' };
    return { text: 'N/A', color: '#565959' };
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F1111', margin: 0 }}>
          Inspection Center
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#565959', marginTop: '0.25rem' }}>
          Quality grading and certification for resale products
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Pending Inspection', value: cases.filter(c => !c.certified).length.toString(), color: '#FF9900' },
          { label: 'Certified Today', value: cases.filter(c => c.certified).length.toString(), color: '#155724' },
          { label: 'Grade A Rate', value: `${Math.round((cases.filter(c => c.grade === 'A').length / cases.length) * 100)}%`, color: '#004085' },
          { label: 'Avg Inspection Time', value: '18 min', color: '#856404' },
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

      {/* Inspection Cases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {cases.map(inspCase => {
          const isExpanded = expandedId === inspCase.id;
          const gradeColor = GRADE_COLORS[inspCase.grade] || { bg: '#F0F2F2', text: '#0F1111' };

          return (
            <div key={inspCase.id} style={{
              background: '#FFFFFF',
              borderRadius: 8,
              border: '1px solid #D5D9D9',
              overflow: 'hidden',
            }}>
              {/* Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : inspCase.id)}
                style={{
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0F1111' }}>
                      {inspCase.productName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginTop: '0.15rem' }}>
                      {inspCase.passportId} | Received: {new Date(inspCase.dateReceived).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: 10,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: gradeColor.bg,
                    color: gradeColor.text,
                  }}>
                    Grade {inspCase.grade}
                  </span>
                  {inspCase.certified && (
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: 10,
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      background: '#D4EDDA',
                      color: '#155724',
                    }}>
                      Certified
                    </span>
                  )}
                  <span style={{ fontSize: '1rem', color: '#565959', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    {'\u25BC'}
                  </span>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid #F0F2F2' }}>
                  <div style={{ paddingTop: '1rem' }}>
                    <h3 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F1111', marginTop: 0, marginBottom: '0.75rem' }}>
                      Inspection Checklist
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {([
                        ['Physical', inspCase.checklist.physical],
                        ['Accessories', inspCase.checklist.accessories],
                        ['Battery', inspCase.checklist.battery],
                        ['Cosmetic', inspCase.checklist.cosmetic],
                        ['Authenticity', inspCase.checklist.authenticity],
                      ] as [string, boolean | null][]).map(([label, val]) => {
                        const result = checkLabel(val);
                        return (
                          <div key={label} style={{
                            textAlign: 'center',
                            padding: '0.75rem 0.5rem',
                            background: '#F7F8F8',
                            borderRadius: 6,
                          }}>
                            <div style={{ fontSize: '0.72rem', color: '#565959', marginBottom: '0.3rem' }}>{label}</div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: result.color }}>
                              {result.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.82rem', color: '#565959' }}>Overall Grade: </span>
                        <span style={{
                          padding: '0.2rem 0.6rem',
                          borderRadius: 10,
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          background: gradeColor.bg,
                          color: gradeColor.text,
                        }}>
                          {inspCase.grade}
                        </span>
                      </div>

                      {!inspCase.certified ? (
                        <button
                          onClick={() => handleApprove(inspCase.id)}
                          style={{
                            padding: '0.5rem 1.25rem',
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
                          Approve Grade
                        </button>
                      ) : (
                        <span style={{
                          padding: '0.5rem 1.25rem',
                          background: '#D4EDDA',
                          borderRadius: 4,
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: '#155724',
                        }}>
                          Certification Generated
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
