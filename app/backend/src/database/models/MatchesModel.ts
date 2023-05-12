import { Model, DataTypes } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

export interface matchesAttributes {
  id: number;
  homeTeamId: string;
  homeTeamGoals: string;
  awayTeamId: string;
  awayTeamGoals: string;
  inProgress: boolean;
}

export default class MatchesModel extends Model<matchesAttributes> {
  declare id: number;
  declare homeTeamId: string;
  declare homeTeamGoals: string;
  declare awayTeamId: string;
  declare awayTeamGoals: string;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeamId: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  awayTeamId: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamsModel
  .hasMany(MatchesModel, { foreignKey: 'homeTeamId', as: 'homeMatches', onDelete: 'CASCADE' });
TeamsModel
  .hasMany(MatchesModel, { foreignKey: 'awayTeamId', as: 'awayMatches', onDelete: 'CASCADE' });
