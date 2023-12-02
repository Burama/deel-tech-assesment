import { sequelizeConnection } from "..";
import { Profile } from "../../const/types";
import { ProfileModel } from "../models";

export const createProfile = async (profile: Profile): Promise<void> => {
  const transaction = await sequelizeConnection.transaction();

  try {
    await ProfileModel.create({
      id: profile.id,
      balance: profile.balance,
      firstName: profile.firstName,
      lastName: profile.lastName,
      profession: profile.profession,
      type: profile.type,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error(error);
  }
}