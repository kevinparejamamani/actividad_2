describe('Página de Registro', () => {
  beforeEach(() => {
    cy.visit('/registro')
  })

  it('debe cargar la página de registro correctamente', () => {
    cy.contains('h2', 'Crear Nueva Cuenta').should('be.visible')
    cy.contains('p', 'Únete a nuestra comunidad').should('be.visible')
  })

  it('debe permitir llenar el formulario de registro', () => {
    // Llenar información personal
    cy.get('input[id="nombres"]').type('Juan Carlos')
    cy.get('input[id="apellidos"]').type('Pérez González')
    cy.get('input[id="email_registro"]').type('juan.perez@ejemplo.com')
    cy.get('input[id="telefono"]').type('+51 999 888 777')
    cy.get('input[id="fecha_nacimiento"]').type('1990-05-15')
    cy.get('select[id="genero"]').select('masculino')

    // Verificar que los datos se ingresaron correctamente
    cy.get('input[id="nombres"]').should('have.value', 'Juan Carlos')
    cy.get('input[id="apellidos"]').should('have.value', 'Pérez González')
    cy.get('input[id="email_registro"]').should('have.value', 'juan.perez@ejemplo.com')
    cy.get('select[id="genero"]').should('have.value', 'masculino')
  })

  it('debe mostrar error si campos requeridos están vacíos', () => {
    cy.get('button[type="submit"]').click()

    // Verificar que los campos required muestran validación
    cy.get('input[id="nombres"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false
    })
    
    cy.get('input[id="email_registro"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false
    })
  })

  it('debe validar formato de email incorrecto', () => {
    cy.get('input[id="email_registro"]').type('email-invalido')
    cy.get('input[id="email_registro"]').blur()

    cy.get('input[id="email_registro"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false
    })
  })

  it('debe permitir navegar a la página de login', () => {
    cy.contains('a', 'Inicia sesión aquí').click()
    cy.url().should('include', '/login')
  })

  it('debe resetear el formulario al hacer click en Limpiar', () => {
    // Llenar algunos campos
    cy.get('input[id="nombres"]').type('Test User')
    cy.get('input[id="email_registro"]').type('test@ejemplo.com')
    
    // Hacer click en Limpiar
    cy.get('button[type="reset"]').click()
    
    // Verificar que los campos se limpiaron
    cy.get('input[id="nombres"]').should('have.value', '')
    cy.get('input[id="email_registro"]').should('have.value', '')
  })

  it('debe mostrar las secciones de beneficios y seguridad', () => {
    cy.contains('h3', '¿Por qué crear una cuenta?').should('be.visible')
    cy.contains('h3', 'Tu Seguridad es Nuestra Prioridad').should('be.visible')
    
    // Verificar beneficios
    cy.contains('Acceso Completo').should('be.visible')
    cy.contains('Personalización').should('be.visible')
    cy.contains('Ofertas Exclusivas').should('be.visible')
    
    // Verificar seguridad
    cy.contains('Datos Encriptados').should('be.visible')
    cy.contains('Sin Spam').should('be.visible')
  })
})