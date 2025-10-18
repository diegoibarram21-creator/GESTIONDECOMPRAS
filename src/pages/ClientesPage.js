import React, { useState, useEffect } from 'react';
import ClienteForm from '../components/ClienteForm';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('clientes');
    if (saved) {
      setClientes(JSON.parse(saved));
    }
  }, []);

  const handleSave = (cliente) => {
    let updated;
    if (editingCliente) {
      updated = clientes.map((c) => (c.id === cliente.id ? cliente : c));
    } else {
      updated = [...clientes, cliente];
    }
    setClientes(updated);
    localStorage.setItem('clientes', JSON.stringify(updated));
    setEditingCliente(null);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('¿Eliminar este cliente?');
    if (!confirm) return;
    const filtered = clientes.filter((c) => c.id !== id);
    setClientes(filtered);
    localStorage.setItem('clientes', JSON.stringify(filtered));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>👥 Clientes</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>📊 Dashboard de clientes</h2>
        <p>Total clientes: {clientes.length}</p>
        <p>Con ventas registradas: {clientes.filter(c => c.history?.some(h => h.subtype === 'venta')).length}</p>
        <p>Cliente más frecuente: {clientes.sort((a, b) => (b.history?.length || 0) - (a.history?.length || 0))[0]?.nombre || '—'}</p>
      </div>

      <ClienteForm onSave={handleSave} editingCliente={editingCliente} />

      <ul>
        {clientes.map((c) => (
          <li key={c.id}>
            <strong>{c.nombre}</strong> — {c.contacto}
            <br />
            <button onClick={() => setEditingCliente(c)}>✏️ Editar</button>
            <button onClick={() => handleDelete(c.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientesPage;
