import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { eventService } from './event.service';

const createEvent = catchAsync(async (req, res) => {
  const video = req.file;
  const payload = {
    ...req.body, // string আসবে
  };
  const result = await eventService.createEvent(payload, video);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

const getAllevents = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await eventService.getAllevents(options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Events retrieved successfully',
    data: result,
  });
});

const getSingleEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventService.getSingleEvent(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event retrieved successfully',
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const video = req.file;
  const payload = {
    ...req.body, // string আসবে
  };
  const result = await eventService.updateEvent(id, payload, video);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventService.deleteEvent(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event deleted successfully',
    data: result,
  });
});

export const eventController = {
  createEvent,
  getAllevents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
