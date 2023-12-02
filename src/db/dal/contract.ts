import { CONTRACT_STATUS } from "../../const/enums";
import { sequelizeConnection } from "..";
import { Contract } from "../../const/types";
import { ContractModel } from "../models";
import { Op } from "sequelize";

export const create = async (contract: Contract): Promise<void> => {
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

export const getById = async (contractId: number): Promise<Contract> => {
  return await ContractModel.findByPk(contractId);
}

export const getAllNonTerminatedByProfileId= async (profileId: number): Promise<Contract[]> => {
  return await ContractModel.findAll({
    where: {
      status: {
        [Op.ne]: CONTRACT_STATUS.TERMINATED,
      },
      [Op.or]: [
        { clientId: profileId },
        { contractorId: profileId }
      ]
    }
  })
}