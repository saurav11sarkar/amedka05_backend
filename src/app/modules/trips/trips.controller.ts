import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { tripsService } from './trips.service';

const createTrip = catchAsync(async (req, res) => {
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;

  const result = await tripsService.createTrip(fromData, file);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Trip created successfully!',
    data: result,
  });
});

const getAllTrips = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'country',
    'location',
    'participants',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await tripsService.getAllTrips(filters, options);
  console.log(result)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trips retrieved successfully!',
    data: result,
  });
});

const getSingleTrip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await tripsService.getSingleTrip(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trip retrieved successfully!',
    data: result,
  });
});

const updateTrip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await tripsService.updateTrip(id, fromData, file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trip updated successfully!',
    data: result,
  });
});

const deleteTrip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await tripsService.deleteTrip(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trip deleted successfully!',
    data: result,
  });
});

export const tripController = {
  createTrip,
  getAllTrips,
  getSingleTrip,
  updateTrip,
  deleteTrip,
};
