import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import { ITrips } from './trips.interface';
import Trips from './trips.model';

const createTrip = async (payload: ITrips, file?: Express.Multer.File) => {
  const existingTrip = await Trips.findOne({
    country: payload.country,
    location: payload.location,
  });

  if (existingTrip) {
    throw new AppError(400, 'Trip already exists');
  }

  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);
  const today = new Date();

  // validate: start < end
  if (startDate >= endDate) {
    throw new AppError(400, 'Start date must be earlier than end date');
  }

  // validate: start date must not be in the past
  if (startDate < today) {
    throw new AppError(400, 'Start date cannot be in the past');
  }

  if (file) {
    const tripsImage = await fileUploader.uploadToCloudinary(file);
    payload.image = tripsImage.secure_url;
  } else {
    const idx = Math.floor(Math.random() * 100) + 1;
    payload.image = `https://avatar.iran.liara.run/public/${idx}.png`;
  }

  const result = await Trips.create(payload);

  return result;
};

const getAllTrips = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);

  const { searchTerm, ...filterData } = params;

  const searchableFields = ['country', 'location', 'participants'];

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

  const result = await Trips.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  const total = await Trips.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTrip = async (id: string) => {
  const result = await Trips.findById(id);
  if (!result) {
    throw new AppError(404, 'Trip not found');
  }

  return result;
};

const updateTrip = async (
  id: string,
  payload: Partial<ITrips>,
  file?: Express.Multer.File,
) => {
  if (file) {
    const tripsImage = await fileUploader.uploadToCloudinary(file);
    payload.image = tripsImage?.secure_url;
  }

  if (payload.startDate && payload.endDate) {
    if (new Date(payload.startDate) > new Date(payload.endDate)) {
      throw new AppError(400, 'Start date cannot be after end date');
    }
  }

  const result = await Trips.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(404, 'Trip not found');
  }

  return result;
};

const deleteTrip = async (id: string) => {
  const result = await Trips.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, 'Trip not found');
  }

  return result;
};

export const tripsService = {
  createTrip,
  getAllTrips,
  getSingleTrip,
  updateTrip,
  deleteTrip,
};
