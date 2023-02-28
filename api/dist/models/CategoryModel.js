import * as dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
dotenv.config();
const sequelize = new Sequelize(process.env.POSTGRES_URL);
const defaultCategories = [
    { categoryName: 'Food' },
    { categoryName: 'Transportation' },
    { categoryName: 'Entertainment' },
    { categoryName: 'Shopping' },
    { categoryName: 'Utilities' },
    { categoryName: 'Farmacy' },
    { categoryName: 'Bills' },
    { categoryName: 'Income' },
    { categoryName: 'Other' }
];
const tableName = `categories_${process.env.PROJECT_NAME}_${process.env.NODE_ENV}`;
export const Category = sequelize.define('Category', {
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
    await Category.sync();
    const categories = await Category.findAll();
    if (categories.length === 0) {
        await Category.bulkCreate(defaultCategories);
    }
};
//# sourceMappingURL=CategoryModel.js.map