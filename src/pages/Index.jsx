import React from 'react'

export default function Index() {
  const html = `<header>
    <h1>Bienvenido a Proyecto Sego CON VERCEL</h1>
    <nav>
      <a href="products.html">Productos</a>
      <a href="cart.html">Carrito</a>
      <a href="login.html">Iniciar Sesión</a>
      <a href="registro.html">Registrarse</a>
    </nav>
  </header>

  <main class="container">
    <h2>Tu tienda en línea</h2>
    <p>Explora nuestros productos, agrega al carrito y completa tu pedido de manera fácil y rápida.</p>
    <a href="products.html"><button>Ver Productos</button></a>
  </main>

  <footer>
    <p>&copy; 2025 Proyecto Sego</p>
  </footer>`
  return <div dangerouslySetInnerHTML={{ __html: html }} />;

}
