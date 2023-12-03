import { Response, NextFunction } from 'express';
import { RequestWithProfile } from '../../const/interfaces';
import {
  RESPONSE_STATUS_CODE,
  RESPONSE_STATUS_MESSAGE,
} from '../../const/enums';
import * as profileDal from '../../db/dal/profiles';

export const getProfile = async (
  req: RequestWithProfile,
  res: Response,
  next: NextFunction,
) => {
  const profileId = req.get('profile_id');

  if (!profileId) {
    return res.status(RESPONSE_STATUS_CODE.UNAUTHORIZED).json({
      message: RESPONSE_STATUS_MESSAGE.UNAUTHORIZED,
    });
  }

  const profile = await profileDal.getById(Number(profileId));

  if (!profile) {
    return res
      .status(RESPONSE_STATUS_CODE.BAD_REQUEST)
      .json({ message: RESPONSE_STATUS_MESSAGE.MISSING_PROFILE });
  }

  req.profile = profile;
  next();
};
