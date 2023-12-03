import * as adminService from '../services/admin';

export const getBestProfession = async (
  startDateStr: string,
  endDateStr: string,
) => {
  return await adminService.getBestProfession(startDateStr, endDateStr);
};

export const getBestClients = async (
  startDateStr: string,
  endDateStr: string,
  limit: number,
) => {
  return await adminService.getBestClients(startDateStr, endDateStr, limit);
};
