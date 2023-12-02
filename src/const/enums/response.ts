export enum RESPONSE_STATUS_CODE {
  OK = 200,
  NOT_PERMITTED = 405,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNALL_ERROR = 500,
}

export enum RESPONSE_STATUS_MESSAGE {
  UNAUTHORIZED = 'Unauthorized.',
  MISSING_PROFILE = 'Profile was not found.',
  NOT_PERMITTED = 'Not permitted.',
  INTERNALL_ERROR = 'Internall error, please try again later.'
}
