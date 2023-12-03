import { ERROR_INTERNAL } from '../../const/enums';
import * as profileDal from '../../db/dal/profiles';

export const getBestProfession = async (
  startDateStr: string,
  endDateStr: string,
) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate > endDate) {
    throw Error(ERROR_INTERNAL.INVALID_DATES);
  }

  return await profileDal.getBestProfession(startDate, endDate);
};

export const getBestClients = async (
  startDateStr: string,
  endDateStr: string,
  limit: number,
) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate > endDate) {
    throw Error(ERROR_INTERNAL.INVALID_DATES);
  }

  return await profileDal.getBestClients(startDate, endDate, limit);
};
