import { Bootstrap } from './bootstrap';

async function startServer() {
  const app = new Bootstrap();
  await app.start();
}

startServer();
