import Registro from '../../src/pages/components/Registro.jsx'

describe('Componente Registro', () => {
  it('debe renderizar correctamente', () => {
    cy.mount(<Registro />)
    
    cy.contains('h2', 'Crear Nueva Cuenta').should('be.visible')
    cy.get('input[id="nombres"]').should('be.visible')
    cy.get('input[id="apellidos"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('debe permitir interacción con los campos', () => {
    cy.mount(<Registro />)
    
    cy.get('input[id="nombres"]').type('María García')
    cy.get('input[id="nombres"]').should('have.value', 'María García')
    
    cy.get('select[id="genero"]').select('femenino')
    cy.get('select[id="genero"]').should('have.value', 'femenino')
  })
})