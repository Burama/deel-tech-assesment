import { CONTRACT_STATUS } from "../../const/enums";
import { sequelizeConnection } from "..";
import { Contract } from "../../const/types";
import { ContractModel } from "../models";

export const createContract = async (contract: Contract): Promise<void> => {
  const transaction = await sequelizeConnection.transaction();

  try {
    await ContractModel.create({
      id: contract.id,
      contractorId: contract.contractorId,
      clientId: contract.clientId,
      terms: contract.terms,
      status: contract.status as CONTRACT_STATUS,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error(error);
  }
}