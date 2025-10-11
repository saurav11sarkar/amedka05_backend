import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import { IContact } from './contact.interface';
import Contact from './contact.model';

const createContact = async (payload: IContact) => {
  const result = await Contact.create(payload);
  if (!result) {
    throw new AppError(400, 'Failed to create contact');
  }
  return result;
};

const getAllContact = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);

  const { searchTerm, ...filterData } = params;

  const searchableFields = [
    'fullName',
    'selectOption',
    'phoneNumber',
    'email',
    'message',
  ];

  const andCondition: any[] = [];

  // search filter
  if (searchTerm) {
    andCondition.push({
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // exact field filter
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Contact.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  const total = await Contact.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleContact = async (id: string) => {
  const result = await Contact.findById(id);
  if (!result) {
    throw new AppError(404, 'Contact not found');
  }
  return result;
};

const updatedContact = async (id: string, payload: IContact) => {
  const result = await Contact.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(404, 'Contact not found');
  }
  return result;
};

const deleteContact = async (id: string) => {
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, 'Contact not found');
  }
  return result;
};

export const contactService = {
  createContact,
  getAllContact,
  getSingleContact,
  updatedContact,
  deleteContact,
};
