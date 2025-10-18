import React, { useEffect, useState } from 'react';
import EvolucionMensualChart from '../components/EvolucionMensualChart';


function DashboardPage() {
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    setProductos(JSON.parse(localStorage.getItem('productos') || '[]'));
    setMovimientos(JSON.parse(localStorage.getItem('movimientos') || '[]'));
    setProveedores(JSON.parse(localStorage.getItem('proveedores') || '[]'));
    setClientes(JSON.parse(localStorage.getItem('clientes') || '[]'));
  }, []);

  const totalInventario = productos.reduce((sum, p) => sum + p.stock * p.price, 0);
  const bajoMinimo = productos.filter((p) => p.minStock && p.stock < p.minStock).length;

  const compras = movimientos.filter((m) => m.subtype === 'compra');
  const ventas = movimientos.filter((m) => m.subtype === 'venta');

  const proveedorTop = proveedores
    .map((p) => ({ ...p, total: (p.history || []).filter((h) => h.subtype === 'compra').length }))
    .sort((a, b) => b.total - a.total)[0];

  const clienteTop = clientes
    .map((c) => ({ ...c, total: (c.history || []).filter((h) => h.subtype === 'venta').length }))
    .sort((a, b) => b.total - a.total)[0];

  return (
    <div style={{ padding: '20px' }}>
      <h1>📊 Dashboard</h1>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>📦 Total productos: {productos.length}</div>
        <div>💰 Valor inventario: ${totalInventario.toLocaleString()}</div>
        <div>⚠️ Bajo mínimo: {bajoMinimo}</div>
        <div>🧾 Compras registradas: {compras.length}</div>
        <div>🛒 Ventas registradas: {ventas.length}</div>
        <div>🚚 Proveedor más activo: {proveedorTop?.nombre || '—'}</div>
        <div>👥 Cliente más frecuente: {clienteTop?.nombre || '—'}</div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>📈 Evolución mensual</h3>
        <EvolucionMensualChart movimientos={movimientos} />
      </div>

    </div>
  );
}

export default DashboardPage;
