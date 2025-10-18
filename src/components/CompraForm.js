import React, { useState } from 'react';
import { registrarOperacion } from '../utils/registrarOperacion';

function CompraForm({ productos, proveedores }) {
  const [proveedorId, setProveedorId] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [documento, setDocumento] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [lineas, setLineas] = useState([]);

  const agregarLinea = () => {
    setLineas([...lineas, { productId: '', cantidad: 1, precio: 0 }]);
  };

  const actualizarLinea = (index, campo, valor) => {
    const actualizadas = [...lineas];
    actualizadas[index][campo] = campo === 'cantidad' || campo === 'precio' ? parseFloat(valor) : valor;
    setLineas(actualizadas);
  };

  const calcularTotales = () => {
    const neto = lineas.reduce((sum, l) => sum + l.cantidad * l.precio, 0);
    const iva = neto * 0.19;
    const total = neto + iva;
    return { neto, iva, total };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const compra = {
      type: 'entrada',
      subtype: 'compra',
      actorId: parseInt(proveedorId),
      actorType: 'proveedor',
      document: { numero: documento, fecha, estado },
      lineas,
    };
    registrarOperacion(compra);
    setProveedorId('');
    setFecha(new Date().toISOString().slice(0, 10));
    setDocumento('');
    setEstado('pendiente');
    setLineas([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>🧾 Registrar compra</h2>
      <select value={proveedorId} onChange={(e) => setProveedorId(e.target.value)} required>
        <option value="">Selecciona proveedor</option>
        {proveedores.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      <input type="text" placeholder="N° documento" value={documento} onChange={(e) => setDocumento(e.target.value)} />
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="pendiente">Pendiente</option>
        <option value="pagado">Pagado</option>
        <option value="anulado">Anulado</option>
      </select>

      <h3>📦 Productos</h3>
      {lineas.map((linea, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <select
            value={linea.productId}
            onChange={(e) => actualizarLinea(index, 'productId', e.target.value)}
            required
          >
            <option value="">Producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
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
            placeholder="Precio unitario"
            value={linea.precio}
            onChange={(e) => actualizarLinea(index, 'precio', e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={agregarLinea}>➕ Agregar producto</button>

      <h4>💰 Totales</h4>
      <p>Neto: ${calcularTotales().neto.toFixed(2)}</p>
      <p>IVA (19%): ${calcularTotales().iva.toFixed(2)}</p>
      <p>Total: ${calcularTotales().total.toFixed(2)}</p>

      <button type="submit">Guardar compra</button>
    </form>
  );
}

export default CompraForm;
