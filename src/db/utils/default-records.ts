import * as defaultProfiles from '../../const/defaultProfiles.json';
import * as defaultContracts from '../../const/defaultContracts.json';
import * as defaultJobs from '../../const/defaultJobs.json';
import * as profileDal from '../dal/profile';
import * as contractDal from '../dal/contract';
import * as jobDal from '../dal/job';

import { Profile, Contract, Job } from '../../const/types';

export const createDefaultTableRecords = async (): Promise<void> => {
  await createDefaultProfiles();
  await createDefaultContracts();
  await createDefaultJobs();
}

const createDefaultProfiles = async (): Promise<void> => {
  for (const profile of defaultProfiles) {
    await profileDal.create(profile as Profile);
  }
}
const createDefaultContracts = async (): Promise<void> => {
  for (const contract of defaultContracts) {
    await contractDal.create(contract as Contract);
  }
}
const createDefaultJobs = async (): Promise<void> => {
  for (const job of defaultJobs) {
    await jobDal.create(job as Job);
  }
}
