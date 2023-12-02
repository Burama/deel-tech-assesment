import { Op, Transaction, col, fn } from "sequelize";
import { Contract, Job, JobWithContract, Profile } from "../../const/types";
import { ContractModel, JobModel } from "../models";
import { CONTRACT_STATUS } from "../../const/enums";


export const create = async (job: Job, transaction?: Transaction): Promise<void> => {
  await JobModel.create({
    id: job.id,
    contractId: job.contractId,
    price: job.price,
    description: job.description,
    paid: job.paid || false,
    paymentDate: job.paymentDate ? new Date(job.paymentDate) : null
  },
  { transaction });
}

export const update = async (job: Job, transaction?: Transaction): Promise<void> => {
  await JobModel.update(
    { 
      price: job.price,
      description: job.description,
      paymentDate: job.paymentDate ? new Date(job.paymentDate) : null,
      paid: job.paid || false,
    },
    { 
      where: {
        id: job.id
      },
      transaction
    },
  );
}

export const getAllUnpaidForActiveContracts = async (profileId: number): Promise<Job[]> => {
  return await JobModel.findAll({
    where: {
      paid: false,
    },
    include: {
      model: ContractModel,
      where: {
        status: CONTRACT_STATUS.IN_PROGRESS,
        [Op.or]: [
          { clientId: profileId },
          { contractorId: profileId }
        ]
      }
    }
  });
}

export const getJobWithContractById = async (jobId: number): Promise<JobWithContract>=> {
  return await JobModel.findByPk(jobId, {
    include: ContractModel,
  });
}

export const getTotalPriceToPayByClientId = async (clientId: number): Promise<number> => {
  const totalPrice = await JobModel.findAll({
    attributes: [
      [fn('SUM', col('price')), 'Sum']
    ],
    include: {
      model: ContractModel,
      where: {
        clientId: clientId,
        status: ['new', 'in_progress'],
      },
    },
    where: {
      paid: false
    },
    raw: true,
  });

  console.log(`TOTAL PRICE: ${totalPrice[0]?.Sum || 0}`);

  return totalPrice[0]?.Sum || 0;
}

