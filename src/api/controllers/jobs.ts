import * as jobsService from '../services/jobs';
import { Job } from '../../const/types';

export const getAllUnpaidForActiveContracts = async (profileId: number): Promise<Job[]> => {
  return await jobsService.getAllUnpaidForActiveContracts(profileId);
}

export const payForJob = async (profileId: number, jobId: number): Promise<void> => {
  await jobsService.payForJob(profileId, jobId);
}
