import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingData, setShippingData] = useState({
    nombre: '',
    direccion: '',
    departamento: '',
    provincia: '',
    distrito: '',
    codigoPostal: '',
    telefono: ''
  });
  const [paymentData, setPaymentData] = useState({
    medioPago: 'tarjeta', // Valor por defecto
    tarjeta: '',
    nombreTarjeta: '',
    expiracion: '',
    cvv: '',
    celularYapePlin: ''
  });
  
  const [peruData, setPeruData] = useState({
    departamentos: [],
    provincias: [],
    distritos: []
  });

  const navigate = useNavigate();

  const peruUbicaciones = {
    departamentos: [
      { id: 'cusco', nombre: 'Cusco' },
      { id: 'lima', nombre: 'Lima' },
      { id: 'arequipa', nombre: 'Arequipa' },
      { id: 'piura', nombre: 'Piura' },
      { id: 'la-libertad', nombre: 'La Libertad' },
      { id: 'lambayeque', nombre: 'Lambayeque' },
      { id: 'junin', nombre: 'Junín' },
      { id: 'puno', nombre: 'Puno' },
      { id: 'cajamarca', nombre: 'Cajamarca' },
      { id: 'ancash', nombre: 'Áncash' }
    ],
    provincias: {
      'cusco': [
        { id: 'cusco', nombre: 'Cusco' },
        { id: 'canchis', nombre: 'Canchis' },
        { id: 'calca', nombre: 'Calca' },
        { id: 'urubamba', nombre: 'Urubamba' }
      ],
      'lima': [
        { id: 'lima', nombre: 'Lima' },
        { id: 'callao', nombre: 'Callao' },
        { id: 'huaral', nombre: 'Huaral' },
        { id: 'canta', nombre: 'Canta' }
      ],
      'arequipa': [
        { id: 'arequipa', nombre: 'Arequipa' },
        { id: 'caylloma', nombre: 'Caylloma' },
        { id: 'camana', nombre: 'Camana' },
        { id: 'islay', nombre: 'Islay' }
      ],
      'piura': [
        { id: 'piura', nombre: 'Piura' },
        { id: 'sullana', nombre: 'Sullana' },
        { id: 'paita', nombre: 'Paita' },
        { id: 'talara', nombre: 'Talara' }
      ],
      'la-libertad': [
        { id: 'trujillo', nombre: 'Trujillo' },
        { id: 'chepen', nombre: 'Chepén' },
        { id: 'pacasmayo', nombre: 'Pacasmayo' },
        { id: 'viru', nombre: 'Virú' }
      ]
    },
    distritos: {
      'cusco': [
        { id: 'san-sebastian', nombre: 'San Sebastian' },
        { id: 'santiago', nombre: 'Santiago' },
        { id: 'wanchaq', nombre: 'Wanchaq' },
        { id: 'san-jeronimo', nombre: 'San Jerónimo' }
      ],
      'lima': [
        { id: 'lima-centro', nombre: 'Lima Cercado' },
        { id: 'miraflores', nombre: 'Miraflores' },
        { id: 'san-isidro', nombre: 'San Isidro' },
        { id: 'barranco', nombre: 'Barranco' }
      ],
      'callao': [
        { id: 'callao', nombre: 'Callao' },
        { id: 'bellavista', nombre: 'Bellavista' },
        { id: 'carmen-de-la-legua', nombre: 'Carmen de la Legua' }
      ],
      'arequipa': [
        { id: 'arequipa-centro', nombre: 'Arequipa Cercado' },
        { id: 'yanahuara', nombre: 'Yanahuara' },
        { id: 'cayma', nombre: 'Cayma' },
        { id: 'sachaca', nombre: 'Sachaca' }
      ],
      'trujillo': [
        { id: 'trujillo-centro', nombre: 'Trujillo Centro' },
        { id: 'victor-larco', nombre: 'Victor Larco' },
        { id: 'la-esperanza', nombre: 'La Esperanza' },
        { id: 'el-porvenir', nombre: 'El Porvenir' }
      ]
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    setCart(savedCart);
    
    const cartTotal = savedCart.reduce((sum, product) => sum + (product.precio || 0), 0);
    setTotal(cartTotal);

    setPeruData({
      departamentos: peruUbicaciones.departamentos,
      provincias: [],
      distritos: []
    });
  }, []);

  const handleShippingChange = (e) => {
    const { id, value } = e.target;
    setShippingData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'departamento') {
      const nuevasProvincias = peruUbicaciones.provincias[value] || [];
      setPeruData(prev => ({
        ...prev,
        provincias: nuevasProvincias,
        distritos: []
      }));
      
      setShippingData(prev => ({
        ...prev,
        departamento: value,
        provincia: '',
        distrito: ''
      }));
    }

    if (id === 'provincia') {
      const nuevosDistritos = peruUbicaciones.distritos[value] || [];
      setPeruData(prev => ({
        ...prev,
        distritos: nuevosDistritos
      }));
      
      setShippingData(prev => ({
        ...prev,
        provincia: value,
        distrito: ''
      }));
    }
  };

  const handlePaymentChange = (e) => {
    const { id, value, type, name } = e.target;
    
    if (type === 'radio') {
      setPaymentData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de finalizar el pedido.");
      return;
    }

    if (!shippingData.departamento || !shippingData.provincia || !shippingData.distrito) {
      alert("Por favor, complete todos los campos de ubicación.");
      return;
    }

    // Validaciones específicas según el medio de pago
    if (paymentData.medioPago === 'tarjeta') {
      if (!paymentData.tarjeta || !paymentData.nombreTarjeta || !paymentData.expiracion || !paymentData.cvv) {
        alert("Por favor, complete todos los datos de la tarjeta.");
        return;
      }
    } else if (paymentData.medioPago === 'electronico') {
      if (!paymentData.celularYapePlin) {
        alert("Por favor, ingrese su número de celular para YAPE/PLIN.");
        return;
      }
    }

    const pedido = {
      productos: cart,
      envio: shippingData,
      pago: paymentData,
      total: total,
      fecha: new Date().toLocaleString()
    };

    localStorage.setItem("pedido", JSON.stringify(pedido));
    localStorage.removeItem("carrito");
    setCart([]);

    alert("✅ Pedido guardado con éxito.");
    navigate("/confirmacion");
  };

  return (
    <>
      <header>
        <h1>Finalizar Pedido</h1>
        <nav>
          <a href="/cart">← Volver al carrito</a>
        </nav>
      </header>

      <main className="container">
        <section className="resumen">
          <h2>Resumen del Pedido</h2>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito</p>
          ) : (
            <>
              <ul>
                {cart.map((producto, index) => (
                  <li key={index}>
                    {producto.nombre} - S/.{(producto.precio || 0).toFixed(2)}
                  </li>
                ))}
              </ul>
              <strong>Total: S/.{total.toFixed(2)}</strong>
            </>
          )}
        </section>

        <form onSubmit={handleSubmit}>
          {/* Datos de Envío */}
          <section style={{ marginBottom: '30px' }}>
            <h2>Datos de Envío</h2>
            <div className="form-group">
              <input
                type="text"
                id="nombre"
                placeholder="Nombre completo"
                value={shippingData.nombre}
                onChange={handleShippingChange}
                required
              />
              <input
                type="text"
                id="direccion"
                placeholder="Dirección de envío"
                value={shippingData.direccion}
                onChange={handleShippingChange}
                required
              />
              
              <div>
                <label htmlFor="departamento">Departamento</label>
                <select 
                  id="departamento" 
                  value={shippingData.departamento}
                  onChange={handleShippingChange}
                  required
                >
                  <option value="">Seleccione</option>
                  {peruData.departamentos.map(depto => (
                    <option key={depto.id} value={depto.id}>
                      {depto.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="provincia">Provincia</label>
                <select 
                  id="provincia" 
                  value={shippingData.provincia}
                  onChange={handleShippingChange}
                  required
                  disabled={!shippingData.departamento}
                >
                  <option value="">Seleccione</option>
                  {peruData.provincias.map(prov => (
                    <option key={prov.id} value={prov.id}>
                      {prov.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="distrito">Distrito</label>
                <select 
                  id="distrito" 
                  value={shippingData.distrito}
                  onChange={handleShippingChange}
                  required
                  disabled={!shippingData.provincia}
                >
                  <option value="">Seleccione</option>
                  {peruData.distritos.map(dist => (
                    <option key={dist.id} value={dist.id}>
                      {dist.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                id="codigoPostal"
                placeholder="Código Postal"
                value={shippingData.codigoPostal}
                onChange={handleShippingChange}
                required
              />
              <input
                type="tel"
                id="telefono"
                placeholder="Teléfono"
                value={shippingData.telefono}
                onChange={handleShippingChange}
                required
              />
            </div>
          </section>

          {/* Datos de Pago */}
          <section style={{ marginBottom: '30px' }}>
            <h2>Datos de Pago</h2>
            
            {/* Selección de medio de pago */}
            <fieldset style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              backgroundColor: '#f9f9f9'
            }}>
              <legend style={{ 
                fontWeight: 'bold', 
                color: '#333',
                padding: '0 10px'
              }}>
                Seleccione un medio de pago
              </legend>
              
              <div className="payment-options">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="pago-tarjeta"
                    name="medioPago"
                    value="tarjeta"
                    checked={paymentData.medioPago === 'tarjeta'}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="pago-tarjeta">Tarjeta de crédito / débito</label>
                </div>

                <div className="payment-option">
                  <input
                    type="radio"
                    id="pago-electronico"
                    name="medioPago"
                    value="electronico"
                    checked={paymentData.medioPago === 'electronico'}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="pago-electronico">YAPE / PLIN</label>
                </div>
              </div>
            </fieldset>

            {/* Formulario de tarjeta (visible solo cuando se selecciona tarjeta) */}
            {paymentData.medioPago === 'tarjeta' && (
              <div className="payment-form">
                <h3>Datos de la Tarjeta</h3>
                <div className="form-group">
                  <input
                    type="text"
                    id="tarjeta"
                    placeholder="Número de tarjeta"
                    value={paymentData.tarjeta}
                    onChange={handlePaymentChange}
                    maxLength="16"
                    required
                  />
                  <input
                    type="text"
                    id="nombreTarjeta"
                    placeholder="Nombre en la tarjeta"
                    value={paymentData.nombreTarjeta}
                    onChange={handlePaymentChange}
                    required
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input
                      type="text"
                      id="expiracion"
                      placeholder="MM/AA"
                      value={paymentData.expiracion}
                      onChange={handlePaymentChange}
                      maxLength="5"
                      required
                    />
                    <input
                      type="text"
                      id="cvv"
                      placeholder="CVV"
                      value={paymentData.cvv}
                      onChange={handlePaymentChange}
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Formulario de YAPE/PLIN (visible solo cuando se selecciona electronico) */}
            {paymentData.medioPago === 'electronico' && (
              <div className="payment-form">
                <h3>Datos de YAPE / PLIN</h3>
                <div className="form-group">
                  <input
                    type="tel"
                    id="celularYapePlin"
                    placeholder="Número de celular (ej: 999888777)"
                    value={paymentData.celularYapePlin}
                    onChange={handlePaymentChange}
                    maxLength="9"
                    required
                  />
                  <div style={{ 
                    padding: '15px', 
                    backgroundColor: '#e8f5e8', 
                    borderRadius: '8px',
                    border: '1px solid #4caf50'
                  }}>
                    <p style={{ margin: '0', color: '#2e7d32' }}>
                      <strong>Instrucciones:</strong> 
                      <br />
                      • Realice el pago a nuestro número: <strong>999 888 777</strong>
                      <br />
                      • Envíe el comprobante al WhatsApp: <strong>999 888 777</strong>
                      <br />
                      • Su pedido será procesado una vez confirmado el pago
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          <button type="submit" style={{ width: '100%' }}>
            Confirmar Pedido
          </button>
        </form>
      </main>
    </>
  );
}