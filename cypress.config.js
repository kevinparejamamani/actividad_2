import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // Opcional: Configurar eventos para videos
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // Si el test pasó, eliminar el video para ahorrar espacio
          const failures = results.tests.some((test) => 
            test.attempts.some((attempt) => attempt.state === 'failed')
          )
          if (!failures) {
            fs.unlinkSync(results.video)
          }
        }
      })
    },
  },
  
  // Configuración de videos
  video: true,
  videoCompression: 16, // Buena calidad sin mucho tamaño
  videoUploadOnPasses: false, // No subir videos de tests que pasan
  videosFolder: 'cypress/videos',
  
  // Configuración de screenshots
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  
  // Tiempo de espera para videos
  pageLoadTimeout: 60000,
  taskTimeout: 60000,
})