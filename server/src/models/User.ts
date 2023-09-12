import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Cart from './Cart';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public readonly cart?: Cart;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

User.hasOne(Cart, { foreignKey: 'userId' });

export default User;
