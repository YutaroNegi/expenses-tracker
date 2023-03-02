import express from 'express';
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path';
import fs from 'fs';

import { connect, sync } from './database.js'
import { authRoutes, trackerRoutes } from './routes/index.js'
dotenv.config()

const corsOptions = {
    origin: '*',
}

const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(process.cwd(), 'build')));
app.use(bodyParser.json())
app.use('/api/auth', authRoutes)
app.use('/api/tracker', trackerRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/tracker', (req, res) => {
  const indexPath = path.join(process.cwd(), '..' ,'build', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('File not found');
  }
});

app.get('*', (req, res) => {
  const indexPath = path.join(process.cwd(), '..' ,'build', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('File not found');
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


const main = async () => {
    await connect()
    await sync()
}

main()