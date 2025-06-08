import { Column, Table, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'transaction',
  timestamps: true,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
})
export class Transaction extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  product_name: string;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  qty: number;
}
