import { sequelizeConnection } from "..";
import { Profile, JobWithContract, Job, Contract } from '../../const/types';
import { CONTRACT_STATUS } from '../../const/enums';

import * as profileDla from './profiles';
import * as contractsDla from './contracts';
import * as jobsDla from './jobs';

const updateProfileWithNewBalance = (profile: Profile, newBalance: number): Profile => {
  return {
    id: profile.id,
    balance: newBalance,
    firstName: profile.firstName,
    lastName: profile.lastName,
    profession: profile.profession,
    type: profile.type,
  }
}

export const payForJob = async (client: Profile, contractor: Profile, jobWithContract: JobWithContract): Promise<void> => {
  const clientWithNewBalance = updateProfileWithNewBalance(client, client.balance - jobWithContract.price);
  const contractorWithNewBalance = updateProfileWithNewBalance(contractor, contractor.balance + jobWithContract.price);

  const paidJob: Job = {
    id: jobWithContract.id,
    price: jobWithContract.price,
    description: jobWithContract.description,
    paymentDate: new Date(), 
    paid: true,
  }
  const finishedContract: Contract = {
    id: jobWithContract.contract.id,
    terms: jobWithContract.contract.terms,
    status: CONTRACT_STATUS.FINISHED,
  }
  
  const transaction = await sequelizeConnection.transaction();

  try {
    await profileDla.update(clientWithNewBalance, transaction);
    await profileDla.update(contractorWithNewBalance, transaction);
    await jobsDla.update(paidJob, transaction);
    await contractsDla.update(finishedContract, transaction)

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
