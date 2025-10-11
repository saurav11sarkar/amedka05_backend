import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import { IPartnership } from './partnership.interface';
import Partnership from './partnership.model';

const createPartnership = async (
  payload: IPartnership,
  file?: Express.Multer.File,
) => {
  if (file) {
    const partnershipImage = await fileUploader.uploadToCloudinary(file);
    payload.image = partnershipImage.secure_url;
  } else {
    const idx = Math.floor(Math.random() * 100) + 1;
    payload.image = `https://avatar.iran.liara.run/public/${idx}.png`;
  }

  const result = await Partnership.create(payload);
  if (!result) {
    throw new AppError(400, 'Failed to create partnership');
  }
  return result;
};

const getAllParnerships = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);

  const { searchTerm, ...filterData } = params;

  const searchableFields = ['title', 'description'];

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

  const result = await Partnership.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  const total = await Partnership.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglePartnership = async (id: string) => {
  const result = await Partnership.findById(id);
  if (!result) {
    throw new AppError(404, 'Partnership not found');
  }
  return result;
};

const updatePartnership = async (
  id: string,
  payload: IPartnership,
  file?: Express.Multer.File,
) => {
  if (file) {
    const partnershipImage = await fileUploader.uploadToCloudinary(file);
    payload.image = partnershipImage.secure_url;
  }

  const result = await Partnership.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(400, 'Failed to update partnership');
  }
  return result;
};

const deletePartnership = async (id: string) => {
  const result = await Partnership.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(400, 'Failed to delete partnership');
  }
  return result;
};

export const partnershipService = {
  createPartnership,
  getAllParnerships,
  getSinglePartnership,
  updatePartnership,
  deletePartnership,
};
