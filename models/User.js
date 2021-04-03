const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection')

// Craete user model
class User extends Model {
    checkPassword(passInput) {
        return bcrypt.compareSync(passInput, this.password);
    }
}

const hashPassword = async (userData) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    return userData;
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }

    },
    {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;