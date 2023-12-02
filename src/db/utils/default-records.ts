import * as defaultProfiles from '../../const/defaultProfiles.json';
import * as defaultContracts from '../../const/defaultContracts.json';
import * as defaultJobs from '../../const/defaultJobs.json';

import { Profile, Contract, Job } from '../../const/types';
import { createContract, createJob, createProfile } from '../dal';

export const createDefaultTableRecords = async (): Promise<void> => {
  await createDefaultProfiles();
  await createDefaultContracts();
  await createDefaultJobs();
}

const createDefaultProfiles = async (): Promise<void> => {
  for (const profile of defaultProfiles) {
    await createProfile(profile as Profile);
  }
}
const createDefaultContracts = async (): Promise<void> => {
  for (const contract of defaultContracts) {
    await createContract(contract as Contract);
  }
}
const createDefaultJobs = async (): Promise<void> => {
  for (const job of defaultJobs) {
    await createJob(job as Job);
  }
}
