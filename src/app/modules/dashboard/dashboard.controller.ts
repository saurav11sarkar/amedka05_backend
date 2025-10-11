import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { dashboardService } from './dashboard.service';

const dashbordOverview = catchAsync(async (req, res) => {
  const result = await dashboardService.dashbordOverview();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dashboard overview data fetched successfully',
    data: result,
  });
});

const activeCreatorsAgent = catchAsync(async (req, res) => {
  const { type } = req.query;
  const result = await dashboardService.activeCreatorsAgent(
    type as 'day' | 'week' | 'month' | 'year',
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Active creators and agents data fetched successfully',
    data: result,
  });
});

const trips = catchAsync(async (req, res) => {
  const result = await dashboardService.trips();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trips data fetched successfully',
    data: result,
  });
});

const contactReport = catchAsync(async (req, res) => {
  const result = await dashboardService.contactReport();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact report data fetched successfully',
    data: result,
  });
});

export const dashboardController = {
  dashbordOverview,
  activeCreatorsAgent,
  trips,
  contactReport,
};
