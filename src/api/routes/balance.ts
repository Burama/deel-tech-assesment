import { Router, Response } from 'express';
import { getProfile } from '../middleware'
import { RequestWithProfile } from '../../const/interfaces';
import { ERROR_INTERNAL, RESPONSE_STATUS_CODE, RESPONSE_STATUS_MESSAGE } from '../../const/enums';

import * as balanceController from '../controllers/balance';

const balanceRouter = Router();


balanceRouter.post('/deposit/:receiverClientId', getProfile, async(req: RequestWithProfile, res: Response) => {
  const senderClient = req.profile;
  const receiverClientId = Number(req.params.receiverClientId);
  const { amount } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res
      .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
      .send({
        message: RESPONSE_STATUS_MESSAGE.INVALID_REQUEST_BODY
      });
  }

  try {
    await balanceController.transaferFunds(senderClient, receiverClientId, amount);
    return res
      .status(RESPONSE_STATUS_CODE.OK)
      .send();
  } catch (error) {
    console.error(error);

    switch (error.message) {
      case ERROR_INTERNAL.NOT_CLIENT: {
        return res
          .status(RESPONSE_STATUS_CODE.NOT_PERMITTED)
          .send({
            message: RESPONSE_STATUS_MESSAGE.NOT_CLIENT
          });
      }
      case ERROR_INTERNAL.INSUFFICIENT_BALANCE: {
        return res
          .status(RESPONSE_STATUS_CODE.NOT_PERMITTED)
          .send({
            message: RESPONSE_STATUS_MESSAGE.INSUFFICIENT_BALANCE,
          });
      }
      case ERROR_INTERNAL.NOT_PERMITTED: {
        return res
          .status(RESPONSE_STATUS_CODE.NOT_PERMITTED)
          .send({
            message: RESPONSE_STATUS_MESSAGE.FORBIDDEN_TO_DEPOSIT
          });
      }
      default: {
        return res
          .status(RESPONSE_STATUS_CODE.INTERNALL_ERROR)
          .send({
            message: RESPONSE_STATUS_MESSAGE.INTERNALL_ERROR,
          })
      }
    }
  }
})

export default balanceRouter;
