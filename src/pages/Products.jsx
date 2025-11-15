import React, { useEffect, useState } from 'react';

export default function Products() {

  const [products, setProducts] = useState([]);

  // Consumir API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://kevinparejamamani.lat/api/v2/productos");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  
  // Función para añadir al carrito
  const handleAddToCart = (product) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(product);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const irCarrito = window.confirm(
      `${product.nombre} añadido al carrito ✅\n\n¿Quieres ir al carrito ahora?`
    );

    if (irCarrito) {
      window.location.href = "/cart";
    }
  };


  return (
    <>
      <header>
        <h1>Lista de Productos</h1>
        <nav>
          <a href="/cart">Carrito</a>
          <a href="/login">Iniciar Sesión</a>
        </nav>
      </header>

      <main className="container">
        <div className="products-grid">

          {products.length === 0 && <p>Cargando productos...</p>}

          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imagen} alt={product.nombre} />
              <h3>{product.nombre}</h3>
              <p>S/. {product.precio}</p>

              <button onClick={() => handleAddToCart(product)}>
                Añadir al carrito
              </button>

            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Sego. Todos los derechos reservados.</p>
        <address>
          Contacto:
          <a href="mailto:ventas@sego.com">ventas@sego.com</a> • +51 999 999 999
        </address>
      </footer>
    </>
  );
}