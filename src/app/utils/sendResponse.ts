import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: { total: number; page: number; limit: number };
    data?: T;
  },
) => {
  const responseBody: typeof jsonData = {
    statusCode: jsonData.statusCode,
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta || undefined,
    data: jsonData.data || undefined,
  };

  res.status(jsonData.statusCode).json(responseBody);
};

export default sendResponse;
