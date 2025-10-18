import React, { useState } from 'react';
import { registrarOperacion } from '../utils/registrarOperacion';

function AjusteForm({ productos }) {
  const [lineas, setLineas] = useState([]);
  const [tipo, setTipo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [fecha, setFecha] = useState('');
  const [numero, setNumero] = useState('');

  const agregarLinea = () => {
    setLineas([...lineas, { productId: '', cantidad: 0, precio: 0 }]);
  };

  const actualizarLinea = (index, campo, valor) => {
    const nuevas = [...lineas];
    nuevas[index][campo] = campo === 'cantidad' || campo === 'precio' ? parseFloat(valor) : valor;
    setLineas(nuevas);
  };

  const eliminarLinea = (index) => {
    const nuevas = [...lineas];
    nuevas.splice(index, 1);
    setLineas(nuevas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipo || !fecha || lineas.length === 0) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    const operacion = {
      type: tipo,
      subtype: 'ajuste',
      actorType: null,
      actorId: null,
      motivo,
      document: { fecha, numero },
      lineas,
    };

    registrarOperacion(operacion);
    alert('✅ Ajuste registrado correctamente');
    setLineas([]);
    setTipo('');
    setMotivo('');
    setFecha('');
    setNumero('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>⚙️ Ajuste de inventario</h2>

      <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
        <option value="">Tipo de ajuste</option>
        <option value="entrada">Entrada</option>
        <option value="salida">Salida</option>
      </select>

      <input
        type="text"
        placeholder="Motivo del ajuste"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Número de documento interno"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <h3>📦 Productos afectados</h3>
      {lineas.map((linea, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <select
            value={linea.productId}
            onChange={(e) => actualizarLinea(index, 'productId', e.target.value)}
            required
          >
            <option value="">Producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Cantidad"
            value={linea.cantidad}
            onChange={(e) => actualizarLinea(index, 'cantidad', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Precio referencial"
            value={linea.precio}
            onChange={(e) => actualizarLinea(index, 'precio', e.target.value)}
          />
          <button type="button" onClick={() => eliminarLinea(index)}>🗑️</button>
        </div>
      ))}

      <button type="button" onClick={agregarLinea}>➕ Agregar producto</button>
      <br />
      <button type="submit">Registrar ajuste</button>
    </form>
  );
}

export default AjusteForm;
