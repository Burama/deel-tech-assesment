import { sequelizeConnection } from "..";
import { Job } from "../../const/types";
import { JobModel } from "../models";

export const create = async (job: Job): Promise<void> => {
  const transaction = await sequelizeConnection.transaction();

  try {
    await JobModel.create({
      id: job.id,
      contractId: job.contractId,
      price: job.price,
      description: job.description,
      paid: job.paid || false,
      paymentDate: new Date(job.paymentDate) || null,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error(error);
  }
}