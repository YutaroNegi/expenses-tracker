import express from 'express';
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path';
import fs from 'fs';
import axios from 'axios'; // Usado para enviar a requisição HTTP
import cron from 'node-cron'; // Usado para agendar a tarefa

import { connect, sync } from './database.js'
import { authRoutes, trackerRoutes } from './routes/index.js'
dotenv.config()

const corsOptions = {
    origin: '*',
}

const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(process.cwd(), 'front', 'build')));
app.use(bodyParser.json())
app.use('/api/auth', authRoutes)
app.use('/api/tracker', trackerRoutes)

app.get('/health', (req, res) => {
  res.sendStatus(200)
})

const indexPath = path.join(process.cwd(), 'front', 'build', 'index.html');

const sendIndexHtml = (req, res) => {
  console.log('Sending index.html')
  console.log(indexPath);
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('File not found');
  }
};

app.get('/tracker', sendIndexHtml);
app.get('*', sendIndexHtml);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const main = async () => {
    await connect()
    await sync()
}

const BASE_URL = process.env.EXPENSES_BASE_URL || 'http://localhost:' + PORT;

// cron job for pinging the application every 14 minutes
const task = cron.schedule('*/14 * * * *', async () => {
  try {
    // Usamos BASE_URL aqui
    const res = await axios.get(`${BASE_URL}/health`);
    console.log('Status:', res.status);
  } catch (error) {
    console.error('Erro ao fazer ping na aplicação:', error.message);
  }
});

if (task) {
    console.log("Cron job scheduled");
} else {
    console.log("Failed to schedule cron job");
}

main()