import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: 'Movimientos', path: '/movimientos' },
    { name: 'Importar', path: '/importar' },
    { name: 'Reports', path: '/reports' },
    { name: 'Settings', path: '/settings' },
    { name: 'Proveedores', path: '/proveedores' }, // ✅ agregado
    { name: 'Clientes', path: '/clientes' },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">INVENTARIO</h2>
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
