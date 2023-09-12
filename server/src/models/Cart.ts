import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Cart extends Model {
  public id!: number;
  public cards?: string[];
  public userId!: number;

}

Cart.init(
    {
        cards: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
        },
    },
    {
        sequelize,
        modelName: 'Cart',
    }
);

export default Cart;