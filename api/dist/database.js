import { Sequelize } from 'sequelize';
import { User, Category, categoryBulk, Expense } from './models/index.js';
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
});
export const sync = async () => {
    try {
        await sequelize.sync();
        await User.sync();
        await Category.sync();
        await Expense.sync();
        await categoryBulk;
        console.log('Database synced successfully');
    }
    catch (error) {
        console.error('Unable to sync database:', error);
    }
};
export const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
//# sourceMappingURL=database.js.map