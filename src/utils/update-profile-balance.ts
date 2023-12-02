import { Profile } from '../../src/const/types';

export const updateProfileWithNewBalance = (profile: Profile, newBalance: number): Profile => {
  return {
    id: profile.id,
    balance: newBalance,
    firstName: profile.firstName,
    lastName: profile.lastName,
    profession: profile.profession,
    type: profile.type,
  }
}