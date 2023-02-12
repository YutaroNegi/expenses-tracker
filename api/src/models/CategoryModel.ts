import * as dotenv from 'dotenv'
dotenv.config()

import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize(process.env.POSTGRES_URL);

const defaultCategories = [
    { categoryName: 'Food' },
    { categoryName: 'Transportation'},
    { categoryName: 'Entertainment'},
    { categoryName: 'Shopping'},
    { categoryName: 'Utilities'},
    { categoryName: 'Other'}
]

const tableName : string = `categories_${process.env.PROJECT_NAME}_${process.env.NODE_ENV}}`
export const Category : any = sequelize.define('Category', {
    categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
},{
    tableName: tableName
});

export const categoryBulk = Category.bulkCreate(defaultCategories)

