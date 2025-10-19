import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("pedido"));
    setOrder(savedOrder);
    setLoading(false);
  }, []);

  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return 'No disponible';
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  // Función para obtener el nombre del medio de pago
  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'tarjeta':
        return 'Tarjeta de crédito/débito';
      case 'electronico':
        return 'YAPE / PLIN';
      default:
        return 'No especificado';
    }
  };
  const renderPaymentDetails = () => {
    if (!order.pago) return null;

    const { medioPago, tarjeta, nombreTarjeta, expiracion, celularYapePlin } = order.pago;

    if (medioPago === 'tarjeta') {
      return (
        <>
          <p><strong>Medio de Pago:</strong> {getPaymentMethodName(medioPago)}</p>
          <p><strong>Tarjeta:</strong> {formatCardNumber(tarjeta)}</p>
          <p><strong>Nombre en Tarjeta:</strong> {nombreTarjeta || 'No disponible'}</p>
          <p><strong>Expiración:</strong> {expiracion || 'No disponible'}</p>
        </>
      );
    } else if (medioPago === 'electronico') {
      return (
        <>
          <p><strong>Medio de Pago:</strong> {getPaymentMethodName(medioPago)}</p>
          <p><strong>Celular:</strong> {celularYapePlin || 'No disponible'}</p>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#e8f5e8', 
            borderRadius: '8px',
            border: '1px solid #4caf50',
            marginTop: '10px'
          }}>
            <p style={{ margin: '0', color: '#2e7d32', fontSize: '14px' }}>
              <strong>✅ Pago pendiente de confirmación</strong>
              <br />
              Por favor envíe el comprobante de pago al WhatsApp: <strong>999 888 777</strong>
            </p>
          </div>
        </>
      );
    }
  };

  const getLocationName = (id, type) => {

    if (!id) return 'No especificado';
    
    // Convertir ID a formato legible
    return id.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Cargando información del pedido...</h2>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>No hay pedido registrado</h2>
          <p>Parece que no has realizado ningún pedido recientemente.</p>
          <Link to="/products" className="btn-primary">
            Ir a Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <header>
        <h1>Confirmar Pedido</h1>
        <nav>
          <Link to="/products">Seguir Comprando</Link>
        </nav>
      </header>

      <main className="container">
        <div className="order-details">
          {/* Resumen del Pedido */}
          <section className="resumen" style={{ marginBottom: '30px' }}>
            <h2>Resumen del Pedido</h2>
            <p><strong>Fecha:</strong> {order.fecha}</p>
            <p><strong>Número de Pedido:</strong> #{(Date.now()).toString().slice(-6)}</p>
            
            <h3>Productos:</h3>
            <ul>
              {order.productos && order.productos.map((producto, index) => (
                <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <strong>{producto.nombre}</strong> - S/.{(producto.precio || 0).toFixed(2)}
                </li>
              ))}
            </ul>
            
            <strong style={{ fontSize: '1.2em', color: '#d32f2f', display: 'block', marginTop: '15px' }}>
              Total: S/.{order.total?.toFixed(2) || '0.00'}
            </strong>
          </section>

          {/* Datos de Envío */}
          <section className="resumen" style={{ marginBottom: '30px' }}>
            <h2>Datos de Envío</h2>
            <p><strong>Nombre:</strong> {order.envio?.nombre || 'No disponible'}</p>
            <p><strong>Dirección:</strong> {order.envio?.direccion || 'No disponible'}</p>
            <p><strong>Departamento:</strong> {getLocationName(order.envio?.departamento, 'departamento')}</p>
            <p><strong>Provincia:</strong> {getLocationName(order.envio?.provincia, 'provincia')}</p>
            <p><strong>Distrito:</strong> {getLocationName(order.envio?.distrito, 'distrito')}</p>
            <p><strong>Código Postal:</strong> {order.envio?.codigoPostal || 'No disponible'}</p>
            <p><strong>Teléfono:</strong> {order.envio?.telefono || 'No disponible'}</p>
          </section>

          {/* Datos de Pago */}
          <section className="resumen" style={{ marginBottom: '30px' }}>
            <h2>Datos de Pago</h2>
            {renderPaymentDetails()}
          </section>

          {/* Estado del Pedido */}
          <section className="resumen" style={{ 
            backgroundColor: order.pago?.medioPago === 'electronico' ? '#fff3cd' : '#d4edda',
            borderColor: order.pago?.medioPago === 'electronico' ? '#ffeaa7' : '#c3e6cb'
          }}>
            <h2>Estado del Pedido</h2>
            {order.pago?.medioPago === 'electronico' ? (
              <div>
                <p style={{ color: '#856404' }}>
                  <strong>🕒 Pendiente de Confirmación</strong>
                </p>
                <p style={{ fontSize: '14px', color: '#856404' }}>
                  Tu pedido será procesado una vez que confirmemos tu pago por YAPE/PLIN.
                  Recibirás un correo de confirmación cuando tu pago sea verificado.
                </p>
              </div>
            ) : (
              <div>
                <p style={{ color: '#155724' }}>
                  <strong>✅ Pedido Confirmado</strong>
                </p>
                <p style={{ fontSize: '14px', color: '#155724' }}>
                  Tu pedido ha sido procesado exitosamente. Recibirás una confirmación por correo electrónico.
                </p>
              </div>
            )}
          </section>

          {/* Acciones */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link to="/products" className="btn-primary" style={{ marginRight: '10px' }}>
              Seguir Comprando
            </Link>
            <button 
              onClick={() => window.print()}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Imprimir Comprobante
            </button>
          </div>
        </div>
      </main>

      {/* Estilos para impresión */}
      <style>{`
        @media print {
          header nav, 
          .btn-primary,
          button {
            display: none !important;
          }
          
          .container {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20px !important;
          }
          
          .resumen {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
}