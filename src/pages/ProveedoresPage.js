import React, { useState, useEffect } from 'react';
import ProveedorForm from '../components/ProveedorForm';

function ProveedoresPage() {
  const [proveedores, setProveedores] = useState([]);
  const [editingProveedor, setEditingProveedor] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('proveedores');
    if (saved) {
      setProveedores(JSON.parse(saved));
    }
  }, []);

  const handleSave = (proveedor) => {
    let updated;
    if (editingProveedor) {
      updated = proveedores.map((p) => (p.id === proveedor.id ? proveedor : p));
    } else {
      updated = [...proveedores, proveedor];
    }
    setProveedores(updated);
    localStorage.setItem('proveedores', JSON.stringify(updated));
    setEditingProveedor(null);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('¿Eliminar este proveedor?');
    if (!confirm) return;
    const filtered = proveedores.filter((p) => p.id !== id);
    setProveedores(filtered);
    localStorage.setItem('proveedores', JSON.stringify(filtered));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🚚 Proveedores</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>📊 Dashboard de proveedores</h2>
        <p>Total proveedores: {proveedores.length}</p>
        <p>Con compras registradas: {proveedores.filter(p => p.history?.some(h => h.subtype === 'compra')).length}</p>
        <p>Proveedor más activo: {
          proveedores
            .sort((a, b) => (b.history?.length || 0) - (a.history?.length || 0))[0]?.nombre || '—'
        }</p>
      </div>

      <ProveedorForm onSave={handleSave} editingProveedor={editingProveedor} />

      <ul>
        {proveedores.map((p) => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> — {p.contacto}
            <br />
            <button onClick={() => setEditingProveedor(p)}>✏️ Editar</button>
            <button onClick={() => handleDelete(p.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProveedoresPage;
