import * as dotenv from 'dotenv'
dotenv.config()

import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // You may need to set this to `true` on some systems
        }
    }
});

const tableName: string = `expenses_${process.env.PROJECT_NAME}_${process.env.NODE_ENV}`
export const Expense: any = sequelize.define('Expense', {
    expenseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fkUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: {
                tableName: `users_${process.env.PROJECT_NAME}_${process.env.NODE_ENV}`,
            },
            key: 'userId'
        }
    },
    fkCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: `categories_${process.env.PROJECT_NAME}_${process.env.NODE_ENV}`,
            key: 'categoryId'
        }
    },
    expenseName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        unique: false
    },
    expenseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false
    },

}, {
    tableName: tableName
});

