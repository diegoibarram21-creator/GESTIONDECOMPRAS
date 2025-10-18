import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';

function InventarioPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('productos');
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  const handleAddProduct = (newProduct) => {
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('productos', JSON.stringify(updated));
    setShowForm(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedList = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedList);
    localStorage.setItem('productos', JSON.stringify(updatedList));
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleDeleteProduct = (id) => {
    const confirm = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (!confirm) return;
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
    localStorage.setItem('productos', JSON.stringify(filtered));
  };

  return (
    <div>
      <h1>Inventario</h1>
      <button onClick={() => {
        setEditingProduct(null);
        setShowForm(true);
      }}>➕ Agregar producto</button>

      {showForm && (
        <ProductForm
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          editingProduct={editingProduct}
        />
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => {
              setEditingProduct(product);
              setShowForm(true);
            }}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default InventarioPage;
