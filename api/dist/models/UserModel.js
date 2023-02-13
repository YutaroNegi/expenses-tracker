import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize(process.env.POSTGRES_URL);
const tableName = `users_${process.env.PROJECT_NAME}_${process.env.NODE_ENV}`;
export const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: tableName
});
//# sourceMappingURL=UserModel.js.map