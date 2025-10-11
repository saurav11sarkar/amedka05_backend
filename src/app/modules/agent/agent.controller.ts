import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { agentService } from './agent.service';

const requestAgent = catchAsync(async (req, res) => {
  const file = req.file;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await agentService.requestAgent(fromData, file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Agent requested successfully',
    data: result,
  });
});

const getAllAgent = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'fullName',
    'phoneNumber',
    'email',
    'country',
    'designation',
    'brandName',
    'workingFrom',
    'status',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await agentService.getAllAgent(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Agent requested successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAgent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await agentService.getSingleAgent(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Agent requested successfully',
    data: result,
  });
});

const updatedAgent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await agentService.updatedAgent(id, fromData, file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Agent updated successfully',
    data: result,
  });
});

const deleteAgent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await agentService.deleteAgent(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Agent deleted successfully',
    data: result,
  });
});

const updatedStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await agentService.updatedStatus(id, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Agent status updated successfully',
    data: result,
  });
});

export const agentController = {
  requestAgent,
  getAllAgent,
  getSingleAgent,
  updatedAgent,
  deleteAgent,
  updatedStatus,
};
