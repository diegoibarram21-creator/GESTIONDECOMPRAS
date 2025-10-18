import React, { useState, useEffect } from 'react';

function ProductoForm({ onSave = () => {}, editingProducto }) {
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    if (editingProducto) {
      setName(editingProducto.name || '');
      setStock(editingProducto.stock || 0);
      setPrice(editingProducto.price || 0);
      setCategoria(editingProducto.categoria || '');
    }
  }, [editingProducto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const producto = {
      id: editingProducto ? editingProducto.id : Date.now(),
      name,
      stock: isNaN(stock) ? 0 : stock,
      price: isNaN(price) ? 0 : price,
      categoria,
      history: editingProducto?.history || [],
    };
    onSave(producto);
    setName('');
    setStock(0);
    setPrice(0);
    setCategoria('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProducto ? '✏️ Editar producto' : '➕ Nuevo producto'}</h2>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Stock inicial"
        value={isNaN(stock) ? '' : stock}
        onChange={(e) => setStock(parseInt(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Precio unitario"
        value={isNaN(price) ? '' : price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <button type="submit">Guardar producto</button>
    </form>
  );
}

export default ProductoForm;
