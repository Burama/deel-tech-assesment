import { Transaction } from "sequelize";
import { Job } from "../../const/types";
import { JobModel } from "../models";

export const create = async (job: Job, transaction?: Transaction): Promise<void> => {
  await JobModel.create({
    id: job.id,
    contractId: job.contractId,
    price: job.price,
    description: job.description,
    paid: job.paid || false,
    paymentDate: new Date(job.paymentDate) || null,
  },
  { transaction });
}