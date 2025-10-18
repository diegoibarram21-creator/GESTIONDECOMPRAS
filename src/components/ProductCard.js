import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, onEdit, onDelete }) {
  const navigate = useNavigate();
  const isLowStock = product.minStock && product.stock <= product.minStock;

  return (
    <div style={{
      border: isLowStock ? '2px solid red' : '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      width: '250px'
    }}>
      {product.imageUrls?.[0] && (
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
        />
      )}
      <h3>{product.name}</h3>
      <p>💰 ${product.price}</p>
      <p>📦 {product.stock} {product.unit}</p>
      {isLowStock && <p style={{ color: 'red' }}>⚠️ Stock bajo el mínimo</p>}
      <button onClick={() => navigate(`/producto/${product.id}`)}>🔍 Ver detalles</button>
      <button onClick={onEdit}>✏️ Editar</button>
      <button onClick={onDelete}>🗑️ Eliminar</button>
    </div>
  );
}

export default ProductCard;
