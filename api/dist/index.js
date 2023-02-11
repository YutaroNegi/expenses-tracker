import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
import { connect, sync } from './database.js';
import { authRoutes } from './routes/authRoutes.js';
app.use(bodyParser.json());
app.get('/', function (req, res) { res.send("All systems operational"); });
app.use('/auth', authRoutes);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const main = async () => {
    await connect();
    await sync();
};
main();
//# sourceMappingURL=index.js.map