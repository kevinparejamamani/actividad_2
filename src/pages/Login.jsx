import React from 'react'

export default function Login() {
  const html = `<!-- Header básico -->
    <header>
        <h1>Sego</h1>
        <nav>
            <a href="login">Iniciar Sesión</a>
            <a href="registro">Registrarse</a>
        </nav>
    </header>

    <!-- Contenido principal -->
    <main>
        <section>
            <h2>Iniciar Sesión</h2>
            <p>Por favor, ingresa tus credenciales para acceder a tu cuenta.</p>
            
            <!-- Formulario de login -->
            <form action="dashboard.html" method="post">
                <fieldset>
                    <legend>Datos de Acceso</legend>
                    
                    <label for="email">Correo Electrónico:</label><br>
                    <input type="email" id="email" name="email" required placeholder="ejemplo@correo.com"><br><br>
                    
                    <label for="password">Contraseña:</label><br>
                    <input type="password" id="password" name="password" required placeholder="Tu contraseña"><br><br>
                    
                    <!-- Checkbox para recordar sesión -->
                    <input type="checkbox" id="recordar" name="recordar" value="si">
                    <label for="recordar">Recordar mi sesión</label><br><br>
                    
                    <!-- Botones del formulario -->
                    <button type="submit">Iniciar Sesión</button>
                    <button type="reset">Limpiar Campos</button>
                </fieldset>
            </form>
            
            <!-- Enlaces adicionales -->
            <p>
                <a href="#">¿Olvidaste tu contraseña?</a><br>
                <a href="registro.html">¿No tienes cuenta? Regístrate aquí</a>
            </p>
        </section>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 Sego. Todos los derechos reservados.</p>
        <p>
            <a href="#contacto">Contacto</a> | 
            <a href="#privacidad">Política de Privacidad</a> | 
            <a href="#terminos">Términos de Uso</a>
        </p>
    </footer>`
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
