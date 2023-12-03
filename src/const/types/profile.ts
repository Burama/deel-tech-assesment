import { PROFILE_TYPE } from '../enums';

export type Profile = {
  id?: number;
  balance: number;
  firstName: string;
  lastName: string;
  profession: string;
  type: PROFILE_TYPE;
};
