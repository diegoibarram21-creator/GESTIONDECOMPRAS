import React, { useState } from 'react';

function MovimientoForm({ productos, onRegister }) {
  const [productId, setProductId] = useState('');
  const [type, setType] = useState('entrada');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const movimiento = {
      productId: parseInt(productId),
      type,
      quantity: parseInt(quantity),
      date,
      reason,
    };

    onRegister(movimiento);

    // Limpiar
    setProductId('');
    setType('entrada');
    setQuantity('');
    setDate(new Date().toISOString().slice(0, 16));
    setReason('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h3>➕ Registrar movimiento</h3>
      <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
        <option value="">Selecciona producto</option>
        {productos.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="entrada">Entrada</option>
        <option value="salida">Salida</option>
      </select>
      <input
        type="number"
        placeholder="Cantidad"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Motivo (opcional)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <button type="submit">Guardar movimiento</button>
    </form>
  );
}

export default MovimientoForm;
