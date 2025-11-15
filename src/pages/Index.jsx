import React from 'react'

export default function Index() {
  const html = `<header>
    <h1>Bienvenido a Proyecto Sego CON VERCEL</h1>

  </header>

  <main class="container">
    <h2>Tu tienda en línea</h2>
    <p>Explora nuestros productos, agrega al carrito y completa tu pedido de manera fácil y rápida.</p>
   
  </main>

  <footer>
    <p>&copy; 2025 Proyecto Sego</p>
  </footer>`
  return <div dangerouslySetInnerHTML={{ __html: html }} />;

}
