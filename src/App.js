import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import InventarioPage from './pages/InventarioPage';
import MovimientosPage from './pages/MovimientosPage';
import ImportarPage from './pages/ImportarPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProveedoresPage from './pages/ProveedoresPage';
import ClientesPage from './pages/ClientesPage';


function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/productos" element={<InventarioPage />} />
          <Route path="/movimientos" element={<MovimientosPage />} />
          <Route path="/importar" element={<ImportarPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/movimientos" element={<MovimientosPage />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
