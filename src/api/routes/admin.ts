import { Router, Response } from 'express';
import { getProfile } from '../middleware'
import { RequestWithProfile } from '../../const/interfaces';
import { ERROR_INTERNAL, RESPONSE_STATUS_CODE, RESPONSE_STATUS_MESSAGE } from '../../const/enums';

import * as adminController from '../controllers/admin';

const adminRouter = Router();


adminRouter.get('/best-profession', getProfile, async(req: RequestWithProfile, res: Response) => {
  const { startDate, endDate } = req.query;
  const isoDateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!startDate || !endDate) {
    return res
      .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
      .send({
        message: RESPONSE_STATUS_MESSAGE.MISSING_REQUIRED_PARAMS,
      });
  }

  if (!isoDateFormatRegex.test(startDate as string) || !isoDateFormatRegex.test(endDate as string)) {
    return res
      .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
      .send({
        message: RESPONSE_STATUS_MESSAGE.INVALID_REQUEST_PARAMS,
      });
  }

  try {
    const bestProffesionName = await adminController.getBestProfession(startDate as string, endDate as string);
    return res
      .status(RESPONSE_STATUS_CODE.OK)
      .send({
        bestProffesion: bestProffesionName
      });
  } catch (error) {
    console.error(error);

    switch (error.message) {
      case ERROR_INTERNAL.INVALID_DATES: {
        return res
          .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
          .send({
            message: RESPONSE_STATUS_MESSAGE.INVALID_REQUEST_PARAMS
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

adminRouter.get('/best-clients', getProfile, async(req: RequestWithProfile, res: Response) => {
  const { startDate, endDate, limit } = req.query;
  const isoDateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res
      .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
      .send({
        message: RESPONSE_STATUS_MESSAGE.INVALID_REQUEST_BODY
      });
  }

  if (!startDate || !endDate) {
    return res
      .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
      .send({
        message: RESPONSE_STATUS_MESSAGE.MISSING_REQUIRED_PARAMS,
      });
  }

  if (!isoDateFormatRegex.test(startDate as string) || !isoDateFormatRegex.test(endDate as string)) {
    return res
      .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
      .send({
        message: RESPONSE_STATUS_MESSAGE.INVALID_REQUEST_PARAMS,
      });
  }

  try {
    const bestClients = await adminController.getBestClients(startDate as string, endDate as string, limit ? Number(limit) : 2);
    return res
      .status(RESPONSE_STATUS_CODE.OK)
      .send(bestClients);
  } catch (error) {
    console.error(error);

    switch (error.message) {
      case ERROR_INTERNAL.INVALID_DATES: {
        return res
          .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
          .send({
            message: RESPONSE_STATUS_MESSAGE.INVALID_REQUEST_PARAMS
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

export default adminRouter;
