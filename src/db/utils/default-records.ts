import * as defaultProfiles from '../../const/defaultProfiles.json';
import * as defaultContracts from '../../const/defaultContracts.json';
import * as defaultJobs from '../../const/defaultJobs.json';
import * as profileDal from '../dal/profile';
import * as contractDal from '../dal/contract';
import * as jobDal from '../dal/job';

import { Profile, Contract, Job } from '../../const/types';
import { sequelizeConnection } from '..';
import { Transaction } from 'sequelize';

export const createDefaultTableRecords = async (): Promise<void> => {
  const transaction = await sequelizeConnection.transaction();

  try {
    await createDefaultProfiles(transaction);
    await createDefaultContracts(transaction);
    await createDefaultJobs(transaction);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error(error);
  }
}

const createDefaultProfiles = async (transaction: Transaction): Promise<void> => {
  for (const profile of defaultProfiles) {
    await profileDal.create(profile as Profile, transaction);
  }
}
const createDefaultContracts = async (transaction: Transaction): Promise<void> => {
  for (const contract of defaultContracts) {
    await contractDal.create(contract as Contract, transaction);
  }
}
const createDefaultJobs = async (transaction: Transaction): Promise<void> => {
  for (const job of defaultJobs) {
    await jobDal.create(job as Job, transaction);
  }
}
