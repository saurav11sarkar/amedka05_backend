import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { creatorService } from './creator.service';


const requestCreator = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;

  const result = await creatorService.requestCreator(fromData, files);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Creator requested successfully',
    data: result,
  });
});


const getAllCreators = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'fullName',
    'phoneNumber',
    'email',
    'bio',
    'description',
    'status',
    'interests',
    'tier'
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await creatorService.getAllCreators(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Creators retrieved successfully',
    data: result,
  });
});


const singleCreator = catchAsync(async (req, res) => {
  const result = await creatorService.singleCreator(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Creator retrieved successfully',
    data: result,
  });
});


const updatedCreator = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await creatorService.updatedCreator(
    req.params.id,
    fromData,
    files,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Creator updated successfully',
    data: result,
  });
});


const deleteCreator = catchAsync(async (req, res) => {
  const result = await creatorService.deleteCreator(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Creator deleted successfully',
    data: result,
  });
});


const updatedStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await creatorService.updatedStatus(id, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Agent status updated successfully',
    data: result,
  });
});


export const creatorController = {
  requestCreator,
  getAllCreators,
  singleCreator,
  updatedCreator,
  deleteCreator,
  updatedStatus
};
