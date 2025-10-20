import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cart from './pages/Cart';
import Confirmacion from './pages/Confirmacion';
import FinalizarPedidoSeccion2 from './pages/FinalizarPedidoSeccion2';
import FinalizarPedido from './pages/FinalizarPedido';
import Products from './pages/Products';
import Index from './pages/Index';
import Registro from './pages/components/Registro';
import Login from './pages/Login';
import FinalizarPedidoSeccion1 from './pages/FinalizarPedidoSeccion1';

export default function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>

        <Link to="/">Home</Link>  | 
<Link to="/cart">Cart</Link> | <Link to="/confirmacion">Confirmacion</Link> | <Link to="/finalizarpedido">FinalizarPedido</Link> | <Link to="/login">Login</Link> | <Link to="/products">Products</Link> | <Link to="/registro">Registro</Link> | 

      </nav>
      <main style={{ padding: '1rem' }}>
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/finalizarpedido" element={<FinalizarPedido />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/registro" element={<Registro />} />
  
        </Routes>
      </main>
    </Router>
  );
}
