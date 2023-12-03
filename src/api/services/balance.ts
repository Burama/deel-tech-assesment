import { updateProfileWithNewBalance } from '../../utils';
import { ERROR_INTERNAL, PROFILE_TYPE } from '../../const/enums';
import { Profile } from '../../const/types';

import * as jobsDal from '../../db/dal/jobs';
import * as profilesDal from '../../db/dal/profiles';
import * as commondDal from '../../db/dal/common';

export const transaferFunds = async (
  senderClient: Profile,
  receiverClientId: number,
  amount: number,
): Promise<void> => {
  if (senderClient.type !== PROFILE_TYPE.CLIENT) {
    throw Error(ERROR_INTERNAL.NOT_CLIENT);
  }

  if (senderClient.balance < amount) {
    throw Error(ERROR_INTERNAL.INSUFFICIENT_BALANCE);
  }

  const totalPriceToPay = await jobsDal.getTotalPriceToPayByClientId(
    senderClient.id,
  );

  if (totalPriceToPay > 0 && amount > 0.25 * totalPriceToPay) {
    throw Error(ERROR_INTERNAL.NOT_PERMITTED);
  }

  const receiverClient = await profilesDal.getById(receiverClientId);

  if (receiverClient.type !== PROFILE_TYPE.CLIENT) {
    throw Error(ERROR_INTERNAL.NOT_CLIENT);
  }

  await commondDal.transferFunds(senderClient, receiverClient, amount);
};
