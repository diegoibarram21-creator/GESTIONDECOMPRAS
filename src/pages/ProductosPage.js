import React, { useState, useEffect } from 'react';
import ProductoForm from '../components/ProductoForm';

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [editingProducto, setEditingProducto] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('productos');
    if (saved) {
      setProductos(JSON.parse(saved));
    }
  }, []);

  const handleSave = (producto) => {
    let updated;
    if (editingProducto) {
      updated = productos.map((p) => (p.id === producto.id ? producto : p));
    } else {
      updated = [...productos, producto];
    }
    setProductos(updated);
    localStorage.setItem('productos', JSON.stringify(updated));
    setEditingProducto(null);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('¿Eliminar este producto?');
    if (!confirm) return;
    const filtered = productos.filter((p) => p.id !== id);
    setProductos(filtered);
    localStorage.setItem('productos', JSON.stringify(filtered));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📦 Productos</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>📊 Dashboard de productos</h2>
        <p>Total productos: {productos.length}</p>
        <p>Stock total: {productos.reduce((acc, p) => acc + p.stock, 0)}</p>
        <p>Valor total: ${productos.reduce((acc, p) => acc + p.stock * p.price, 0).toFixed(2)}</p>
        <p>Producto más vendido: {
          productos.sort((a, b) => (b.history?.length || 0) - (a.history?.length || 0))[0]?.name || '—'
        }</p>
      </div>

      <ProductoForm onSave={handleSave} editingProducto={editingProducto} />

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — Stock: {p.stock} — Precio: ${p.price}
            <br />
            <button onClick={() => setEditingProducto(p)}>✏️ Editar</button>
            <button onClick={() => handleDelete(p.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductosPage;
