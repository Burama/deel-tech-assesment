export enum RESPONSE_STATUS_CODE {
  OK = 200,
  NOT_PERMITTED = 405,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNALL_ERROR = 500,
}

export enum RESPONSE_STATUS_MESSAGE {
  MISSING_REQUIRED_PARAMS = 'Missing required params.',
  INVALID_REQUEST_PARAMS = 'Invalid request params.',
  INVALID_REQUEST_BODY = 'Invalid request body.',
  UNAUTHORIZED = 'Unauthorized.',
  MISSING_PROFILE = 'Profile was not found.',
  NOT_CLIENT = 'Profile is not a client.',
  NOT_PERMITTED = 'Not permitted.',
  INTERNALL_ERROR = 'Internall error, please try again later.',
  INSUFFICIENT_BALANCE = 'Insufficient balance.',
  FORBIDDEN_TO_DEPOSIT = 'Deposit amount is too high.',
}
