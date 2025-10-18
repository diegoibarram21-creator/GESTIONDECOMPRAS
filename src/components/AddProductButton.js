import React from 'react';

function AddProductButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ marginBottom: '20px' }}>
      ➕ Agregar nuevo producto
    </button>
  );
}

export default AddProductButton;
