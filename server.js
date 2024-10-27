import { createServer } from 'vite'

async function startServer() {
  try {
    const server = await createServer({
      // Vite設定をインラインで上書き
      server: {
        port: 3000,
        strictPort: false,
        host: true,
        hmr: {
          port: 443,
          clientPort: 443,
          host: 'localhost'
        }
      }
    })

    await server.listen()

    server.printUrls()
  } catch (e) {
    console.error('Error starting server:', e)
    process.exit(1)
  }
}

startServer()
