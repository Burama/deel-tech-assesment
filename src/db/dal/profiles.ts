import { Transaction } from "sequelize";
import { Profile } from "../../const/types";
import { ProfileModel } from "../models";

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