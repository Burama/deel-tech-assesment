import { Request } from 'express';
import { Profile } from '../types';

export interface RequestWithProfile extends Request {
  profile: Profile;
}
