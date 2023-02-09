import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
import pg from 'pg';
const conString = process.env.POSTGRES_URL;
export const client = new pg.Client(conString);
import { authRoutes } from './routes/authRoutes.js';
app.get('/', function (req, res) {
    res.send("All systems operational");
});
app.use('/auth', authRoutes);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
client.connect(function (err) {
    if (err)
        return console.error('could not connect to postgres', err);
    client.query('SELECT NOW() AS "theTime"', function (err, result) {
        if (err)
            return console.error('error running query', err);
        console.log(result.rows[0].theTime);
        console.log("Connected to Postgres");
        client.end();
    });
});
//# sourceMappingURL=index.js.map