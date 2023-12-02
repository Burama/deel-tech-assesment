import * as jobsService from '../services/jobs';
import { Job, Profile } from '../../const/types';

export const getAllUnpaidForActiveContracts = async (profileId: number): Promise<Job[]> => {
  return await jobsService.getAllUnpaidForActiveContracts(profileId);
}

export const payForJob = async (client: Profile, jobId: number): Promise<void> => {
  await jobsService.payForJob(client, jobId);
}
