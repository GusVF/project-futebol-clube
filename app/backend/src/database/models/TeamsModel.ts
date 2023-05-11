import { Model, DataTypes } from 'sequelize';
import db from '.';

export interface teamsAttributes {
  id: number,
  teamName: string,
}
export default class TeamsModel extends Model<teamsAttributes> {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});
