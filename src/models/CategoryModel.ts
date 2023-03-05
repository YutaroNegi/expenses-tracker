import * as dotenv from 'dotenv'

import { Sequelize, DataTypes } from 'sequelize';
dotenv.config()
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // You may need to set this to `true` on some systems
        }
    }
});

const defaultCategories = [
    { categoryName: 'Grocery' },
    { categoryName: 'House' },
    { categoryName: 'Farmacy' },
    { categoryName: 'Restaurant' },
    { categoryName: 'Delivery' },
    { categoryName: 'Others' },
    { categoryName: 'Entertainment' },
    { categoryName: 'Bills' },
    { categoryName: 'Garden' },
    { categoryName: 'Transportation' },
    { categoryName: 'Income' },
]

const tableName: string = `categories_${process.env.PROJECT_NAME}_${process.env.PROJECT_NODE_ENV}`
export const Category: any = sequelize.define('Category', {
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
}, {
    tableName: tableName
});

export const startCategoryTable = async () => {
    await Category.sync()
    const categories = await Category.findAll()
    if (categories.length === 0) {
        await Category.bulkCreate(defaultCategories)
    }
}