import React, { useState, useEffect } from 'react';

function ReportsPage() {
  const [movimientos, setMovimientos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroSubtipo, setFiltroSubtipo] = useState('');
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('');
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('movimientos') || '[]');
    setMovimientos(data);
  }, []);

  const filtrar = () => {
    return movimientos.filter((m) => {
      const fecha = new Date(m.document?.fecha);
      const desde = filtroFechaDesde ? new Date(filtroFechaDesde) : null;
      const hasta = filtroFechaHasta ? new Date(filtroFechaHasta) : null;

      return (
        (!filtroTipo || m.type === filtroTipo) &&
        (!filtroSubtipo || m.subtype === filtroSubtipo) &&
        (!desde || fecha >= desde) &&
        (!hasta || fecha <= hasta)
      );
    });
  };

  const resultados = filtrar();

  const totalFiltrado = resultados.reduce((sum, m) => sum + m.total, 0);
  const totalCompras = resultados.filter(m => m.subtype === 'compra').reduce((sum, m) => sum + m.total, 0);
  const totalVentas = resultados.filter(m => m.subtype === 'venta').reduce((sum, m) => sum + m.total, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>📑 Reportes</h1>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="">Tipo</option>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
        <select value={filtroSubtipo} onChange={(e) => setFiltroSubtipo(e.target.value)}>
          <option value="">Subtipo</option>
          <option value="compra">Compra</option>
          <option value="venta">Venta</option>
          <option value="ajuste">Ajuste</option>
        </select>
        <input type="date" value={filtroFechaDesde} onChange={(e) => setFiltroFechaDesde(e.target.value)} />
        <input type="date" value={filtroFechaHasta} onChange={(e) => setFiltroFechaHasta(e.target.value)} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>📊 Métricas del reporte</h3>
        <p>Movimientos filtrados: {resultados.length}</p>
        <p>Total general: ${totalFiltrado.toLocaleString()}</p>
        <p>Total compras: ${totalCompras.toLocaleString()}</p>
        <p>Total ventas: ${totalVentas.toLocaleString()}</p>
      </div>

      <h3>📋 Detalle de movimientos</h3>
      <ul>
        {resultados.map((m) => (
          <li key={m.id} style={{ marginBottom: '10px' }}>
            <strong>{m.subtype.toUpperCase()}</strong> — {m.document?.numero || '—'} — {m.document?.fecha} — ${m.total.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportsPage;
