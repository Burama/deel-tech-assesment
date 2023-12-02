import { Contract } from 'src/const/types';
import * as contractDal from '../../db/dal/contract';
import { ERROR_INTERNAL } from '../../const/enums';

export const getById = async (profileId: number, contractId: number): Promise<Contract> => {
  const contract = await contractDal.getById(contractId);

  if (contract && contract.clientId !== profileId && contract.contractorId !== profileId) {
    throw Error(ERROR_INTERNAL.NOT_PERMITTED);
  }

  return contract;
}

export const getAllNonTerminatedByProfileId = async (profileId: number): Promise<Contract[]> => {
  return await contractDal.getAllNonTerminatedByProfileId(profileId);
}