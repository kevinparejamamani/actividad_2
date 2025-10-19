import React, { useEffect } from 'react';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Camara Bullet Exterior 1080P IR 40m 2.8-12mm",
      price: "S/.40.00",
      image: product1
    },
    {
      id: 2,
      name: "Ax Home Kit Alarma Wifi 16 Zonas. Inc(Panel, Pir, Magn y Pulsador)",
      price: "S/.150.00",
      image: product2
    },
    {
      id: 3,
      name: "Cerradura Inteligente con lector de Huella",
      price: "S/.50.00",
      image: product3
    }
  ];

  useEffect(() => {
    const handleAddToCart = (product) => {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(product);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      
      const irCarrito = window.confirm(
        `${product.nombre} añadido al carrito ✅\n\n¿Quieres ir al carrito ahora?`
      );

      if (irCarrito) {
        window.location.href = "/cart";
      } else {
        console.log("El usuario sigue comprando...");
      }
    };

    // Agregar event listeners a los botones
    const botones = document.querySelectorAll(".product-card button");
    botones.forEach((boton, index) => {
      boton.addEventListener("click", () => {
        const product = products[index];
        const productData = {
          nombre: product.name,
          precio: parseFloat(product.price.replace("S/.", "")),
          img: product.image
        };
        handleAddToCart(productData);
      });
    });

    // Cleanup: remover event listeners
    return () => {
      botones.forEach(boton => {
        boton.removeEventListener("click", () => {});
      });
    };
  }, [products]);

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
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button>Añadir al carrito</button>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>&copy; 2025 Sego. Todos los derechos reservados.</p>
        <address>
          Contacto: <a href="mailto:ventas@sego.com">ventas@sego.com</a> • +51 999 999 999
        </address>
      </footer>
    </>
  );
}