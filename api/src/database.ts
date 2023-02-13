import { Sequelize } from 'sequelize';
import { User, startCategoryTable, Expense } from './models/index.js';

const sequelize = new Sequelize(process.env.POSTGRES_URL);

export const sync = async () => {
    try {
        await User.sync();
        await Expense.sync();
        await startCategoryTable();
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Unable to sync database:', error);
    }
}

export const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export const close = async () => {
    try {
        await sequelize.close();
        console.log('Connection has been closed successfully.');
    } catch (error) {
        console.error('Unable to close the database:', error);
    }
}