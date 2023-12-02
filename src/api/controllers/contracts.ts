import { Contract } from '../../const/types';

import * as contractsService from '../services/contracts';

export const getById = async(profileId: number, contractId: number): Promise<Contract> => {
  return await contractsService.getById(profileId, contractId);
}

export const getAllNonTerminatedByProfileId = async (profileId: number): Promise<Contract[]>  => {
  return await contractsService.getAllNonTerminatedByProfileId(profileId);
}