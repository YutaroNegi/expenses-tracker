import { Sequelize } from 'sequelize';
import { User } from './models/UserModel.js';
const sequelize = new Sequelize('postgres://wznthdum:Wrdne7VnqjEfw31ds9IqBqG3r68TLPwW@jelani.db.elephantsql.com/wznthdum', {
    dialect: 'postgres',
});
export const sync = async () => {
    try {
        await User.sync();
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