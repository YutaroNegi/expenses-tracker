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

const tableName: string = `users_${process.env.PROJECT_NAME}_${process.env.NODE_ENV}`
export const User: any = sequelize.define('User', {
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

