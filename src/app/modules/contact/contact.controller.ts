import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { contactService } from './contact.service';

const createContact = catchAsync(async (req, res) => {
  const result = await contactService.createContact(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Contact created successfully',
    data: result,
  });
});

const getAllContact = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'fullName',
    'selectOption',
    'phoneNumber',
    'email',
    'message',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await contactService.getAllContact(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact retrieved successfully',
    data: result,
  });
});
const getSingleContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await contactService.getSingleContact(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact retrieved successfully',
    data: result,
  });
});

const updatedContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await contactService.updatedContact(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact updated successfully',
    data: result,
  });
});
const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await contactService.deleteContact(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact deleted successfully',
    data: result,
  });
});

export const contactController = {
  createContact,
  getAllContact,
  getSingleContact,
  updatedContact,
  deleteContact,
};
