import * as balanceService from '../services/balance';
import { Profile } from '../../const/types';

export const transaferFunds = async (
  senderClient: Profile,
  receiverClientId: number,
  amount: number,
): Promise<void> => {
  await balanceService.transaferFunds(senderClient, receiverClientId, amount);
};
