import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { partnershipService } from './partnership.service';

const createPartnership = catchAsync(async (req, res) => {
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await partnershipService.createPartnership(fromData, file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Partnership created successfully',
    data: result,
  });
});

const getAllParnerships = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'description']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await partnershipService.getAllParnerships(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Partnerships retrieved successfully',
    data: result,
  });
});

const getSinglePartnership = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await partnershipService.getSinglePartnership(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Partnership retrieved successfully',
    data: result,
  });
});
const updatePartnership = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await partnershipService.updatePartnership(id, fromData, file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Partnership updated successfully',
    data: result,
  });
});
const deletePartnership = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await partnershipService.deletePartnership(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Partnership deleted successfully',
    data: result,
  });
});

export const partnershipController = {
  createPartnership,
  getAllParnerships,
  getSinglePartnership,
  updatePartnership,
  deletePartnership,
};
