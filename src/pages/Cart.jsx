import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce((sum, product) => sum + (product.precio || 0), 0);

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("carrito", JSON.stringify(newCart));
  };

  const clearCart = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      setCart([]);
      localStorage.setItem("carrito", JSON.stringify([]));
    }
  };

  return (
    <>
      <header>
        <h1>Carrito de Compras</h1>
        <nav>
          <Link to="/products">Seguir comprando</Link>
          {cart.length > 0 && (
            <button onClick={clearCart} className="clear-cart-btn">
              Vaciar Carrito
            </button>
          )}
        </nav>
      </header>

      <main className="container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Tu carrito está vacío</h2>
            <p>¡Agrega algunos productos para comenzar!</p>
            <Link to="/products" className="btn-primary">
              Ir a Productos
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((product, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{product.nombre}</h4>
                    {product.img && (
                      <img 
                        src={product.img} 
                        alt={product.nombre}
                        className="cart-item-image"
                      />
                    )}
                  </div>
                  <span>S/.{(product.precio || 0).toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="remove-btn"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            
            <div className="resumen">
              <h3>Total: S/.{total.toFixed(2)}</h3>
              <Link to="/finalizarpedido" className="btn-checkout">
                Finalizar Pedido
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}