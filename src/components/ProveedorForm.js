import React, { useState, useEffect } from 'react';

function ProveedorForm({ onSave, editingProveedor }) {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [contacto, setContacto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    if (editingProveedor) {
      setNombre(editingProveedor.nombre);
      setRut(editingProveedor.rut);
      setContacto(editingProveedor.contacto);
      setDireccion(editingProveedor.direccion);
      setCategoria(editingProveedor.categoria);
    }
  }, [editingProveedor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const proveedor = {
      id: editingProveedor ? editingProveedor.id : Date.now(),
      nombre,
      rut,
      contacto,
      direccion,
      categoria,
    };
    onSave(proveedor);
    setNombre('');
    setRut('');
    setContacto('');
    setDireccion('');
    setCategoria('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProveedor ? '✏️ Editar proveedor' : '➕ Nuevo proveedor'}</h2>
      <input
        type="text"
        placeholder="Nombre empresa o proveedor"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="RUT o ID"
        value={rut}
        onChange={(e) => setRut(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contacto (email o teléfono)"
        value={contacto}
        onChange={(e) => setContacto(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoría (importador, local, etc.)"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <button type="submit">Guardar proveedor</button>
    </form>
  );
}

export default ProveedorForm;
