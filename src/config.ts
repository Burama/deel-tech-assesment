import * as dotenv from 'dotenv';
import { CONFIG } from './const';

dotenv.config();

const envConfig = process.env;

export const getConfigValue = (key: CONFIG): any => {
  return envConfig[key];
}

export const isDev = (): boolean => {
  return getConfigValue(CONFIG.NODE_ENV) === 'dev';
}

export const getServerUrl = (): string => {
  const protocol = getConfigValue(CONFIG.SERVER_PROTOCOL);
  const host = getConfigValue(CONFIG.SERVER_HOST);
  const port = getConfigValue(CONFIG.SERVER_PORT);

  return `${protocol}://${host}:${port}`;
}