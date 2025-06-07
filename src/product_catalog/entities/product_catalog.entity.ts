import { Column, Table, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'product_catalog',
  timestamps: true,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
})
export class ProductCatalog extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  price: number;
}
