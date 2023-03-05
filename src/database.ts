import { Sequelize } from 'sequelize';
import { User, startCategoryTable, Expense, Category } from './models/index.js';

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // You may need to set this to `true` on some systems
        }
    }
});

export const sync = async () => {
    try {
        Expense.belongsTo(Category, { foreignKey: 'fkCategoryId' });
        Category.hasMany(Expense, { foreignKey: 'fkCategoryId' });
        Expense.belongsTo(User, { foreignKey: 'fkUserId' });
        User.hasMany(Expense, { foreignKey: 'fkUserId' });

        await startCategoryTable();
        await User.sync();
        await Expense.sync();

        console.log('Database synced successfully');
    } catch (error) {
        console.error('Unable to sync database:', error);
    }
}

export const setForeignKeys = async () => {
    try {
        Expense.belongsTo(Category, { foreignKey: 'fkCategoryId' });
        Category.hasMany(Expense, { foreignKey: 'fkCategoryId' });
        Expense.belongsTo(User, { foreignKey: 'fkUserId' });
        User.hasMany(Expense, { foreignKey: 'fkUserId' });
    } catch (error) {
        console.error('Unable to set foreign keys:', error);
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