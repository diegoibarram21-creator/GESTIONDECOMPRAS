import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('productos');
    if (saved) {
      const products = JSON.parse(saved);
      const found = products.find((p) => p.id === parseInt(id));
      setProduct(found);
    }
  }, [id]);

  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.name}</h1>

      {/* Galería de imágenes */}
      {product.imageUrls?.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {product.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Imagen ${index + 1}`}
              style={{ width: '150px', borderRadius: '8px' }}
            />
          ))}
        </div>
      )}

      {/* Datos del producto */}
      <p>💰 Precio de venta: ${product.price}</p>
      {product.cost && <p>🧾 Costo de adquisición: ${product.cost}</p>}
      <p>📦 Stock actual: {product.stock} {product.unit}</p>
      {product.minStock && <p>⚠️ Stock mínimo: {product.minStock}</p>}
      {product.category && <p>🏷️ Categoría: {product.category}</p>}
      {product.description && <p>📝 Descripción: {product.description}</p>}
      {product.sku && <p>🔢 Código SKU: {product.sku}</p>}
      {product.supplier && <p>🚚 Proveedor: {product.supplier}</p>}
      {product.brand && <p>🏭 Marca: {product.brand}</p>}
      {product.model && <p>🔧 Modelo: {product.model}</p>}
      {product.location && <p>📍 Ubicación física: {product.location}</p>}
      <p>🕒 Fecha de ingreso: {new Date(product.createdAt).toLocaleString()}</p>

      {/* Historial de movimientos */}
      {product.history?.length > 0 && (
        <>
          <h3>📜 Historial de movimientos</h3>
          <ul>
            {product.history.map((entry, index) => (
              <li key={index}>
                {entry.date} — {entry.type} de {entry.quantity} unidades
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Botones de acción */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate('/')}>⬅️ Volver al inventario</button>
        <button
          onClick={() => {
            localStorage.setItem('editingProductId', product.id);
            navigate('/');
          }}
        >
          ✏️ Editar producto
        </button>
        <button
          onClick={() => {
            const confirm = window.confirm('¿Eliminar este producto? Esta acción no se puede deshacer.');
            if (!confirm) return;
            const saved = JSON.parse(localStorage.getItem('productos'));
            const filtered = saved.filter((p) => p.id !== product.id);
            localStorage.setItem('productos', JSON.stringify(filtered));
            navigate('/');
          }}
        >
          🗑️ Eliminar producto
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
