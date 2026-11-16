import { DataTypes } from 'sequelize';
import sequelize from './dbConfig.js';

// Define a Users table model
export const Users = sequelize.define('Users', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Define a Messages table model
export const Messages = sequelize.define('Messages', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

await sequelize.sync();


