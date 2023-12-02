import { Transaction, fn, col, Op, literal, where } from "sequelize";
import { Profile } from "../../const/types";
import { ContractModel, JobModel, ProfileModel } from "../models";
import { PROFILE_TYPE } from '../../const/enums';
import { group } from "console";

export const create = async (profile: Profile, transaction?: Transaction): Promise<void> => {
  await ProfileModel.create({
    id: profile.id,
    balance: profile.balance,
    firstName: profile.firstName,
    lastName: profile.lastName,
    profession: profile.profession,
    type: profile.type,
  },
  { transaction });
}

export const update = async (profile: Profile, transaction?: Transaction): Promise<void> => {
  await ProfileModel.update(
    {
      balance: profile.balance,
      firstName: profile.firstName,
      lastName: profile.lastName,
      profession: profile.profession,
      type: profile.type,
    },
    {
      where: {
        id: profile.id,
      },
      transaction
    }
  );
}

export const getById = async (profileId: number): Promise<Profile> => {
  return await ProfileModel.findByPk(profileId);
}

export const getBestProfession = async (startDate: Date, endDate: Date): Promise<string> => {
  const professions = await ProfileModel.findAll({
    attributes: [
      'profession',
      [fn('SUM', col('price')), 'totalPaid'],
    ],
    include: [
      {
        model: ContractModel,
        as: 'contractorContracts',
        include: [
          {
            model: JobModel,
            where: {
              paid: true,
              paymentDate: {
                [Op.between]: [
                  startDate,
                  endDate,
                ],
              },
            },
          },
        ],
      },
    ],
    where: {
      type: PROFILE_TYPE.CONTRACTOR,
    },
    group: ['profession'],
    raw: true,
  });

  const bestProfession = professions.reduce((bestProfession: any, currentProfession: any) => {
    return currentProfession!.totalPaid > bestProfession.totalPaid ? currentProfession : bestProfession;
  }, professions[0]);

  return bestProfession.profession
} 

export const getBestClients = async (startDate: Date, endDate: Date, limit: number) => {
  const bestClients: any =  await ProfileModel.findAll({
    attributes: ['firstName', 'lastName', [fn('SUM', col('price')), 'totalPaid'],],
    where: {
      type: PROFILE_TYPE.CLIENT,
    }, 
    include: [
      {
        model: ContractModel,
        as: 'clientContracs',
        attributes: [],
        include: [
          {
            model: JobModel,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.between]: [
                  startDate,
                  endDate,
                ],
              },
            }
          }
        ]
      },   
    ],
    group: 'profiles.id',
  });

  return [...bestClients].sort((firstClient, secondClient) => secondClient.dataValues.totalPaid - firstClient.dataValues.totalPaid).slice(0, limit);
}