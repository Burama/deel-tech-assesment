import { CONTRACT_STATUS } from '../enums';

export type Contract = {
  id?: number;
  clientId?: number;
  contractorId?: number;
  terms: string;
  status: CONTRACT_STATUS;
};
