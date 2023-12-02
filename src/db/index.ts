import { CONFIG } from '../const/enums';
import { getConfigValue } from '../config';
import { Sequelize } from 'sequelize-typescript';
import { ContractModel, JobModel, ProfileModel } from './models';

export const sequelizeConnection = new Sequelize({
  dialect: getConfigValue(CONFIG.DB_DIALECT),
  storage: getConfigValue(CONFIG.DB_STORAGE_PATH),
  models: [ContractModel, ProfileModel, JobModel]
});

const closeSequelizeConnection = async (): Promise<void> => {
  try {
    await sequelizeConnection.close();
    console.log('Sequelize connection closed gracefully.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing Sequelize connection:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await closeSequelizeConnection();
})

process.on('SIGTERM', async () => {
  await closeSequelizeConnection();
})
