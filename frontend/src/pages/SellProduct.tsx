import { useState } from 'react';

interface OwnedProduct {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  orderId: string;
}

const MY_PRODUCTS: OwnedProduct[] = [
  { id: '1', name: 'iPhone 14 Pro', category: 'Electronics', purchaseDate: '2023-09-15', orderId: 'ORD-88421' },
  { id: '2', name: 'Sony WH-1000XM4', category: 'Audio', purchaseDate: '2023-06-22', orderId: 'ORD-77293' },
  { id: '3', name: 'iPad Pro 11"', category: 'Electronics', purchaseDate: '2023-11-01', orderId: 'ORD-91045' },
  { id: '4', name: 'Bose SoundLink', category: 'Audio', purchaseDate: '2024-01-10', orderId: 'ORD-93112' },
  { id: '5', name: 'Samsung Galaxy Watch 5', category: 'Electronics', purchaseDate: '2023-12-05', orderId: 'ORD-89437' },
];

export default function SellProduct() {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<OwnedProduct | null>(null);
  const [condition, setCondition] = useState('excellent');
  const [accessories, setAccessories] = useState(true);
  const [originalPackaging, setOriginalPackaging] = useState(true);
  const [reason, setReason] = useState('Upgrading');
  const [expectedPrice, setExpectedPrice] = useState('');

  const handleSubmit = () => {
    setStep(3);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F1111', margin: 0 }}>
          Sell My Product
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#565959', marginTop: '0.25rem' }}>
          List your product for resale through the Passport Network
        </p>
      </div>

      {/* Progress Steps */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '2rem',
      }}>
        {[
          { num: 1, label: 'Select Product' },
          { num: 2, label: 'Product Details' },
          { num: 3, label: 'Confirmation' },
        ].map((s, idx) => (
          <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: step >= s.num ? '#FF9900' : '#F0F2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: step >= s.num ? '#0F1111' : '#565959',
            }}>
              {s.num}
            </div>
            <span style={{ fontSize: '0.82rem', color: step >= s.num ? '#0F1111' : '#565959', fontWeight: step === s.num ? 600 : 400 }}>
              {s.label}
            </span>
            {idx < 2 && <div style={{ width: 40, height: 2, background: step > s.num ? '#FF9900' : '#D5D9D9', margin: '0 0.25rem' }} />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Product */}
      {step === 1 && (
        <div style={{ background: '#FFFFFF', borderRadius: 8, padding: '1.5rem', border: '1px solid #D5D9D9' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F1111', marginTop: 0, marginBottom: '1rem' }}>
            Select a product to sell
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MY_PRODUCTS.map(product => (
              <div
                key={product.id}
                onClick={() => { setSelectedProduct(product); setStep(2); }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '1px solid #D5D9D9',
                  borderRadius: 6,
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF9900'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#D5D9D9'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0F1111' }}>{product.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#565959', marginTop: '0.2rem' }}>
                    {product.category} | Purchased: {new Date(product.purchaseDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#565959' }}>{product.orderId}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Product Details */}
      {step === 2 && selectedProduct && (
        <div style={{ background: '#FFFFFF', borderRadius: 8, padding: '1.5rem', border: '1px solid #D5D9D9' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F1111', marginTop: 0, marginBottom: '0.25rem' }}>
            Product Details
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#565959', marginTop: 0, marginBottom: '1.5rem' }}>
            Selling: <strong>{selectedProduct.name}</strong>
          </p>

          {/* Condition */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#0F1111', marginBottom: '0.5rem' }}>
              Condition
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['excellent', 'good', 'fair'].map(c => (
                <label key={c} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 1rem',
                  border: `2px solid ${condition === c ? '#FF9900' : '#D5D9D9'}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: condition === c ? 600 : 400,
                  background: condition === c ? '#FFF8E7' : '#FFFFFF',
                }}>
                  <input
                    type="radio"
                    name="condition"
                    value={c}
                    checked={condition === c}
                    onChange={() => setCondition(c)}
                    style={{ accentColor: '#FF9900' }}
                  />
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#0F1111', marginBottom: '0.5rem' }}>
                Accessories Included
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[true, false].map(val => (
                  <label key={String(val)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="radio" name="accessories" checked={accessories === val} onChange={() => setAccessories(val)} style={{ accentColor: '#FF9900' }} />
                    {val ? 'Yes' : 'No'}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#0F1111', marginBottom: '0.5rem' }}>
                Original Packaging
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[true, false].map(val => (
                  <label key={String(val)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="radio" name="packaging" checked={originalPackaging === val} onChange={() => setOriginalPackaging(val)} style={{ accentColor: '#FF9900' }} />
                    {val ? 'Yes' : 'No'}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Reason */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#0F1111', marginBottom: '0.5rem' }}>
              Reason for Sale
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              style={{ padding: '0.5rem 0.75rem', border: '1px solid #D5D9D9', borderRadius: 4, fontSize: '0.85rem', minWidth: 200 }}
            >
              <option value="Upgrading">Upgrading</option>
              <option value="No longer needed">No longer needed</option>
              <option value="Gift">Gift</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#0F1111', marginBottom: '0.5rem' }}>
              Expected Price ({'\u20B9'})
            </label>
            <input
              type="number"
              value={expectedPrice}
              onChange={e => setExpectedPrice(e.target.value)}
              placeholder="Enter expected price"
              style={{ padding: '0.5rem 0.75rem', border: '1px solid #D5D9D9', borderRadius: 4, fontSize: '0.85rem', width: 200 }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setStep(1)}
              style={{
                padding: '0.6rem 1.5rem',
                background: '#FFFFFF',
                border: '1px solid #D5D9D9',
                borderRadius: 4,
                fontWeight: 600,
                fontSize: '0.85rem',
                color: '#0F1111',
                cursor: 'pointer',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              style={{
                padding: '0.6rem 1.5rem',
                background: '#FF9900',
                border: 'none',
                borderRadius: 4,
                fontWeight: 600,
                fontSize: '0.85rem',
                color: '#0F1111',
                cursor: 'pointer',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Submit for Resale
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && selectedProduct && (
        <div style={{ background: '#FFFFFF', borderRadius: 8, padding: '2rem', border: '1px solid #D5D9D9', textAlign: 'center' }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#D4EDDA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.5rem',
            color: '#155724',
            fontWeight: 700,
          }}>
            {'✓'}
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F1111', marginTop: 0, marginBottom: '0.5rem' }}>
            Resale Request Submitted
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#565959', marginBottom: '1.5rem' }}>
            Your {selectedProduct.name} has been listed for resale through the Passport Network.
          </p>

          <div style={{
            background: '#F7F8F8',
            borderRadius: 8,
            padding: '1.25rem',
            maxWidth: 400,
            margin: '0 auto 1.5rem',
            textAlign: 'left',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#565959' }}>Passport ID</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F1111' }}>PP-{2000 + parseInt(selectedProduct.id)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#565959' }}>QR Code</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F1111', fontFamily: 'monospace' }}>RESALE-PP-{2000 + parseInt(selectedProduct.id)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#565959' }}>Pickup Scheduled</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F1111' }}>Tomorrow, 10:00 AM - 1:00 PM</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#565959' }}>Condition</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F1111' }}>{condition.charAt(0).toUpperCase() + condition.slice(1)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.82rem', color: '#565959' }}>Expected Price</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F1111' }}>{expectedPrice ? `\u20B9${parseInt(expectedPrice).toLocaleString('en-IN')}` : 'Market Rate'}</span>
            </div>
          </div>

          <div style={{
            display: 'inline-block',
            padding: '0.75rem 1.25rem',
            border: '2px solid #0F1111',
            borderRadius: 8,
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#0F1111',
            background: '#F7F8F8',
            marginBottom: '1.5rem',
          }}>
            RESALE-PP-{2000 + parseInt(selectedProduct.id)}
          </div>
          <p style={{ fontSize: '0.72rem', color: '#565959', marginTop: '0.25rem' }}>
            Scan this code at any hub to track your resale
          </p>

          <button
            onClick={() => { setStep(1); setSelectedProduct(null); setExpectedPrice(''); }}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.5rem',
              background: '#FF9900',
              border: 'none',
              borderRadius: 4,
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#0F1111',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            Sell Another Product
          </button>
        </div>
      )}
    </div>
  );
}
