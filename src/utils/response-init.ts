import type { StatusCodes } from 'http-status-codes';
import { getReasonPhrase } from 'http-status-codes';

export const getResponseInit = (statusCode: StatusCodes) => {
  const responseInit: ResponseInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    status: statusCode,
    statusText: getReasonPhrase(statusCode),
  };
  return responseInit;
};
