import { Router, Response } from 'express';
import { getProfile } from '../middleware'
import { RequestWithProfile } from '../../const/interfaces';
import { ERROR_INTERNAL, RESPONSE_STATUS_CODE, RESPONSE_STATUS_MESSAGE } from '../../const/enums';

import * as jobsController from '../controllers/jobs';

const jobsRouter = Router();

jobsRouter.get('/unpaid', getProfile, async(req: RequestWithProfile, res: Response) => {
  const profile = req.profile;

  try {
    const jobs = await jobsController.getAllUnpaidForActiveContracts(profile.id);
    return res
      .status(RESPONSE_STATUS_CODE.OK)
      .send(jobs);
  } catch(error) {
    console.error(error);
    return res
      .status(RESPONSE_STATUS_CODE.INTERNALL_ERROR)
      .send({
        message: RESPONSE_STATUS_MESSAGE.INTERNALL_ERROR,
      })
  }
});

jobsRouter.post('/:jobId/pay', getProfile, async(req: RequestWithProfile, res: Response) => {
  const profile = req.profile;
  const jobId = Number(req.params.jobId);

  try {
    await jobsController.payForJob(profile, jobId);
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
      case ERROR_INTERNAL.NOT_PERMITTED: {
        return res
          .status(RESPONSE_STATUS_CODE.NOT_PERMITTED)
          .send({
            message: RESPONSE_STATUS_MESSAGE.NOT_PERMITTED
          });
      }
      case ERROR_INTERNAL.INSUFFICIENT_BALANCE: {
        return res
          .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
          .send({
            message: RESPONSE_STATUS_MESSAGE.INSUFFICIENT_BALANCE
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

export default jobsRouter;
