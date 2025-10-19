import React from 'react';
import { Link } from 'react-router-dom';

export default function Registro() {
  return (
    <div>
      {/* Header */}
      <header>
        <div className="header-container">
          <h1>Sego</h1>
          <nav>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/registro" className="active">Registrarse</Link>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container">
        <section>
          <h2>Crear Nueva Cuenta</h2>
          <p>Únete a nuestra comunidad. Es rápido, fácil y completamente gratis.</p>
          
          {/* Formulario de registro */}
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset className="form-group">
              <legend>Información Personal</legend>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label htmlFor="nombres">Nombres:</label>
                  <input 
                    type="text" 
                    id="nombres" 
                    name="nombres" 
                    required 
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                
                <div>
                  <label htmlFor="apellidos">Apellidos:</label>
                  <input 
                    type="text" 
                    id="apellidos" 
                    name="apellidos" 
                    required 
                    placeholder="Ingresa tus apellidos"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email_registro">Correo Electrónico:</label>
                <input 
                  type="email" 
                  id="email_registro" 
                  name="email_registro" 
                  required 
                  placeholder="ejemplo@correo.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telefono">Número de Teléfono:</label>
                <input 
                  type="tel" 
                  id="telefono" 
                  name="telefono" 
                  placeholder="+51 999 999 999"
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
                  <input 
                    type="date" 
                    id="fecha_nacimiento" 
                    name="fecha_nacimiento" 
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="genero">Género:</label>
                  <select id="genero" name="genero" required>
                    <option value="">Selecciona una opción</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero_no_decir">Prefiero no decir</option>
                  </select>
                </div>
              </div>
            </fieldset>
        
            {/* Botones del formulario */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button type="submit" style={{ flex: 2 }}>Crear Mi Cuenta</button>
              <button type="reset" style={{ flex: 1, background: '#666' }}>Limpiar Formulario</button>
            </div>
          </form>
          
          {/* Enlaces adicionales */}
          <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
            <p>
              <strong>¿Ya tienes una cuenta?</strong> 
              <Link to="/login" style={{ color: '#d32f2f', textDecoration: 'none', marginLeft: '8px' }}>
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </section>
        
        {/* Sección de beneficios */}
        <section style={{ marginTop: '40px' }}>
          <h3>¿Por qué crear una cuenta?</h3>
          <div className="benefits-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginTop: '20px'
          }}>
            {[
              { icon: '🔓', title: 'Acceso Completo', desc: 'Disfruta de todas las funcionalidades de nuestro sitio' },
              { icon: '🎨', title: 'Personalización', desc: 'Configura tu experiencia según tus preferencias' },
              { icon: '💰', title: 'Ofertas Exclusivas', desc: 'Recibe descuentos y promociones especiales' },
              { icon: '⭐', title: 'Soporte Prioritario', desc: 'Atención al cliente preferencial' },
              { icon: '📊', title: 'Historial', desc: 'Guarda y consulta tu historial de actividades' }
            ].map((benefit, index) => (
              <div key={index} className="product-card" style={{ textAlign: 'left', height: 'auto' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{benefit.icon}</div>
                <h4 style={{ margin: '10px 0', color: '#d32f2f' }}>{benefit.title}</h4>
                <p style={{ margin: 0, color: '#666' }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Seguridad y privacidad */}
        <section style={{ marginTop: '40px' }}>
          <h3>Tu Seguridad es Nuestra Prioridad</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px',
            marginTop: '20px'
          }}>
            {[
              { icon: '🔒', title: 'Datos Encriptados', desc: 'Toda tu información está protegida con encriptación de grado militar' },
              { icon: '🛡️', title: 'Sin Spam', desc: 'Nunca compartimos tu información con terceros' },
              { icon: '📧', title: 'Control Total', desc: 'Puedes cancelar las notificaciones en cualquier momento' },
              { icon: '🗑️', title: 'Elimina tu Cuenta', desc: 'Tienes el derecho de eliminar tu cuenta cuando quieras' }
            ].map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '15px', 
                padding: '20px', 
                background: '#f9f9f9', 
                borderRadius: '8px',
                border: '1px solid #ffcdd2'
              }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{item.title}</h4>
                  <p style={{ margin: 0, color: '#666', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        background: '#333', 
        color: 'white', 
        textAlign: 'center', 
        padding: '20px', 
        marginTop: '40px' 
      }}>
        <p>&copy; 2025 Sego. Todos los derechos reservados.</p>
        <p>
          <a href="#contacto" style={{ color: '#ffcdd2', textDecoration: 'none', margin: '0 10px' }}>
            Contacto
          </a> | 
          <a href="#privacidad" style={{ color: '#ffcdd2', textDecoration: 'none', margin: '0 10px' }}>
            Política de Privacidad
          </a> | 
          <a href="#terminos" style={{ color: '#ffcdd2', textDecoration: 'none', margin: '0 10px' }}>
            Términos de Uso
          </a>
        </p>
      </footer>
    </div>
  );
}