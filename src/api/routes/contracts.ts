import { Router, Response } from 'express';
import { getProfile } from '../middleware'
import { RequestWithProfile } from '../../const/interfaces';
import { RESPONSE_STATUS_CODE, RESPONSE_STATUS_MESSAGE, ERROR_INTERNAL } from '../../const/enums';

import * as contractsController from '../controllers/contracts';

const contractsRouter = Router();

contractsRouter.get('/:contractId', getProfile, async (req: RequestWithProfile, res: Response) => {
  const profile = req.profile;
  const contractId = Number(req.params.contractId);

  try {
    const contract = await contractsController.getById(profile.id, contractId);
    return res
      .status(RESPONSE_STATUS_CODE.OK)
      .send(contract);
  } catch(error) {
    console.error(error);

    switch (error.message) {
      case ERROR_INTERNAL.NOT_PERMITTED: {
        return res
        .status(RESPONSE_STATUS_CODE.NOT_PERMITTED)
        .send({
          message: RESPONSE_STATUS_MESSAGE.NOT_PERMITTED,
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
});

contractsRouter.get('/', getProfile, async(req: RequestWithProfile, res: Response) => {
  const profile = req.profile;

  try {
    const contracts = await contractsController.getAllNonTerminatedByProfileId(profile.id);
    return res
      .status(RESPONSE_STATUS_CODE.OK)
      .send(contracts);
  } catch(error) {
    console.error(error);
    return res
      .status(RESPONSE_STATUS_CODE.INTERNALL_ERROR)
      .send({
        message: RESPONSE_STATUS_MESSAGE.INTERNALL_ERROR,
      })
  }
});

export default contractsRouter;