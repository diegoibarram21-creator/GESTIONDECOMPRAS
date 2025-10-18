import React, { useState, useEffect } from 'react';

function ClienteForm({ onSave, editingCliente }) {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [contacto, setContacto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [canal, setCanal] = useState('');

  useEffect(() => {
    if (editingCliente) {
      setNombre(editingCliente.nombre);
      setRut(editingCliente.rut);
      setContacto(editingCliente.contacto);
      setDireccion(editingCliente.direccion);
      setCanal(editingCliente.canal);
    }
  }, [editingCliente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cliente = {
      id: editingCliente ? editingCliente.id : Date.now(),
      nombre,
      rut,
      contacto,
      direccion,
      canal,
    };
    onSave(cliente);
    setNombre('');
    setRut('');
    setContacto('');
    setDireccion('');
    setCanal('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingCliente ? '✏️ Editar cliente' : '➕ Nuevo cliente'}</h2>
      <input type="text" placeholder="Nombre completo o empresa" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="text" placeholder="RUT o ID" value={rut} onChange={(e) => setRut(e.target.value)} />
      <input type="text" placeholder="Contacto (email o teléfono)" value={contacto} onChange={(e) => setContacto(e.target.value)} />
      <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      <input type="text" placeholder="Canal (retail, mayorista, ecommerce...)" value={canal} onChange={(e) => setCanal(e.target.value)} />
      <button type="submit">Guardar cliente</button>
    </form>
  );
}

export default ClienteForm;
