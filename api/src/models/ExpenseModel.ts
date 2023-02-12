import * as dotenv from 'dotenv'
dotenv.config()

import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize(process.env.POSTGRES_URL);

const tableName : string = `expenses_${process.env.PROJECT_NAME}_${process.env.NODE_ENV}}`
export const Expense : any = sequelize.define('Expense', {
    expenseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fkUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    fkCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
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
    
},{
    tableName: tableName
});

