export function registrarOperacion(operacion) {
  const movimientos = JSON.parse(localStorage.getItem('movimientos') || '[]');
  const productos = JSON.parse(localStorage.getItem('productos') || '[]');
  const proveedores = JSON.parse(localStorage.getItem('proveedores') || '[]');
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

  operacion.id = Date.now();
  operacion.total = operacion.lineas.reduce((sum, l) => sum + l.cantidad * l.precio, 0);

  // Actualizar inventario
  operacion.lineas.forEach((l) => {
    const producto = productos.find((p) => p.id === parseInt(l.productId));
    if (producto) {
      producto.stock += operacion.type === 'entrada' ? l.cantidad : -l.cantidad;
      producto.history = producto.history || [];
      producto.history.push({
        movimientoId: operacion.id,
        tipo: operacion.type,
        subtipo: operacion.subtype,
        cantidad: l.cantidad,
        precio: l.precio,
        fecha: operacion.document.fecha,
      });
    }
  });

  // Actualizar actor
  const actorList = operacion.actorType === 'proveedor' ? proveedores : clientes;
  const actor = actorList.find((a) => a.id === operacion.actorId);
  if (actor) {
    actor.history = actor.history || [];
    actor.history.push({
      movimientoId: operacion.id,
      tipo: operacion.type,
      subtipo: operacion.subtype,
      total: operacion.total,
      fecha: operacion.document.fecha,
    });
  }

  movimientos.push(operacion);

  localStorage.setItem('movimientos', JSON.stringify(movimientos));
  localStorage.setItem('productos', JSON.stringify(productos));
  localStorage.setItem('proveedores', JSON.stringify(proveedores));
  localStorage.setItem('clientes', JSON.stringify(clientes));
}
