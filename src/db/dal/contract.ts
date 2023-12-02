import { CONTRACT_STATUS } from "../../const/enums";
import { Contract } from "../../const/types";
import { ContractModel } from "../models";
import { Op, Transaction } from "sequelize";

export const create = async (contract: Contract, transaction?: Transaction): Promise<void> => {
  await ContractModel.create({
    id: contract.id,
    contractorId: contract.contractorId,
    clientId: contract.clientId,
    terms: contract.terms,
    status: contract.status as CONTRACT_STATUS,
  },
  { transaction });
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