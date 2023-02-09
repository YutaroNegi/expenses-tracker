import pg from 'pg';
const conString = process.env.POSTGRES_URL;
export const client = new pg.Client(conString);
//# sourceMappingURL=connection.js.map