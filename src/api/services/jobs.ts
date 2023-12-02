import { Job } from '../../const/types';
import { PROFILE_TYPE, ERROR_INTERNAL } from '../../const/enums';

import * as jobsDal from '../../db/dal/jobs';
import * as profilesDal from '../../db/dal/profiles';
import * as commonDal from '../../db/dal/common';

export const getAllUnpaidForActiveContracts = async (profileId: number): Promise<Job[]> => {
  return await jobsDal.getAllUnpaidForActiveContracts(profileId);
}

export const payForJob = async (profileId: number, jobId: number): Promise<void> => {
  const client = await profilesDal.getById(profileId);

  if (client.type != PROFILE_TYPE.CLIENT) {
    throw Error(ERROR_INTERNAL.NOT_CLIENT);
  }

  const jobWithContract = await jobsDal.getJobWithContractById(jobId);

  if (profileId != jobWithContract.contract.clientId) {
    throw Error(ERROR_INTERNAL.NOT_PERMITTED);
  }

  if (Number(client.balance) < Number(jobWithContract.price)) {
    throw Error(ERROR_INTERNAL.INSUFFICIENT_BALANCE);
  }

  const contractor = await profilesDal.getById(jobWithContract.contract.contractorId);

  await commonDal.payForJob(client, contractor, jobWithContract);
}
