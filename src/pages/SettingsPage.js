import React, { useState, useEffect } from 'react';

function SettingsPage() {
  const [iva, setIva] = useState(0);
  const [moneda, setMoneda] = useState('$');
  const [stockMinimo, setStockMinimo] = useState(0);
  const [empresa, setEmpresa] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ajustes') || '{}');
    if (saved.iva) setIva(saved.iva);
    if (saved.moneda) setMoneda(saved.moneda);
    if (saved.stockMinimo) setStockMinimo(saved.stockMinimo);
    if (saved.empresa) setEmpresa(saved.empresa);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ajustes = { iva, moneda, stockMinimo, empresa };
    localStorage.setItem('ajustes', JSON.stringify(ajustes));
    alert('✅ Ajustes guardados correctamente');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>⚙️ Ajustes globales</h1>
      <form onSubmit={handleSubmit}>
        <label>IVA (%)</label>
        <input
          type="number"
          value={iva}
          onChange={(e) => setIva(parseFloat(e.target.value))}
        />

        <label>Moneda</label>
        <input
          type="text"
          value={moneda}
          onChange={(e) => setMoneda(e.target.value)}
        />

        <label>Stock mínimo por defecto</label>
        <input
          type="number"
          value={stockMinimo}
          onChange={(e) => setStockMinimo(parseInt(e.target.value))}
        />

        <label>Nombre de empresa</label>
        <input
          type="text"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />

        <button type="submit">Guardar ajustes</button>
      </form>
    </div>
  );
}

export default SettingsPage;
