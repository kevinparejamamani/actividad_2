import '@testing-library/jest-dom'

// Opcional: Configurar para evitar warnings en tests
const originalError = console.error

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})