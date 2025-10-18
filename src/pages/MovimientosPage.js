import React, { useState, useEffect } from 'react';
import CompraForm from '../components/CompraForm';
import VentaForm from '../components/VentaForm';
import AjusteForm from '../components/AjusteForm';

function MovimientosPage() {
  const [subtipo, setSubtipo] = useState('');
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    setProductos(JSON.parse(localStorage.getItem('productos') || '[]'));
    setProveedores(JSON.parse(localStorage.getItem('proveedores') || '[]'));
    setClientes(JSON.parse(localStorage.getItem('clientes') || '[]'));
    setMovimientos(JSON.parse(localStorage.getItem('movimientos') || '[]'));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔁 Movimientos</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>📊 Dashboard de movimientos</h2>
        <p>Entradas: {movimientos.filter(m => m.type === 'entrada').length}</p>
        <p>Salidas: {movimientos.filter(m => m.type === 'salida').length}</p>
        <p>Compras: {movimientos.filter(m => m.subtype === 'compra').length}</p>
        <p>Ventas: {movimientos.filter(m => m.subtype === 'venta').length}</p>
        <p>Ajustes: {movimientos.filter(m => m.subtype === 'ajuste').length}</p>
        <p>Último movimiento: {movimientos[movimientos.length - 1]?.document?.numero || '—'}</p>
      </div>

      <select value={subtipo} onChange={(e) => setSubtipo(e.target.value)}>
        <option value="">Selecciona tipo de operación</option>
        <option value="compra">🧾 Compra</option>
        <option value="venta">🛒 Venta</option>
        <option value="ajuste">⚙️ Ajuste</option>
      </select>

      {subtipo === 'compra' && (
        <CompraForm productos={productos} proveedores={proveedores} />
      )}
      {subtipo === 'venta' && (
        <VentaForm productos={productos} clientes={clientes} />
      )}
      {subtipo === 'ajuste' && (
        <AjusteForm productos={productos} />
      )}

      <h3 style={{ marginTop: '40px' }}>📋 Historial de movimientos</h3>
      <ul>
        {movimientos.map((m) => (
          <li key={m.id}>
            [{m.type.toUpperCase()}] {m.subtype} — {m.document?.numero || '—'} — {m.document?.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovimientosPage;
