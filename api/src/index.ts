import express from 'express';
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
dotenv.config()

var corsOptions = {
    origin: '*',
}

const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

import { connect, sync } from './database.js'
import { authRoutes, trackerRoutes } from './routes/index.js'

app.use(bodyParser.json())
app.get('/', function (req, res) { res.send("All systems operational") })
app.use('/api/auth', authRoutes)
app.use('/api/tracker', trackerRoutes)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const main = async () => {
    await connect()
    await sync()
}

main()