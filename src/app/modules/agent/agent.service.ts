import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import { IAgent } from './agent.interface';
import Agent from './agent.model';

const requestAgent = async (payload: IAgent, file?: Express.Multer.File) => {
  const agent = await Agent.findOne({ email: payload.email });
  if (agent) throw new AppError(409, 'Agent already created');

  if (file) {
    const agentImage = await fileUploader.uploadToCloudinary(file);
    payload.image = agentImage.secure_url;
  } else {
    const idx = Math.floor(Math.random() * 100) + 1;
    payload.image = `https://avatar.iran.liara.run/public/${idx}.png`;
  }

  const result = await Agent.create(payload);
  if (!result) throw new AppError(400, 'Agent not created');

  return result;
};

const getAllAgent = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);

  const { searchTerm, ...filterData } = params;

  const searchableFields = [
    'fullName',
    'phoneNumber',
    'email',
    'country',
    'designation',
    'brandName',
    'workingFrom',
    'status',
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

  const result = await Agent.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  const total = await Agent.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAgent = async (id: string) => {
  const result = await Agent.findById(id);
  if (!result) throw new AppError(404, 'Agent not found');

  return result;
};

const updatedAgent = async (
  id: string,
  payload: Partial<IAgent>,
  file?: Express.Multer.File,
) => {
  if (file) {
    const agentImage = await fileUploader.uploadToCloudinary(file);
    payload.image = agentImage.secure_url;
  }
  const result = await Agent.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new AppError(404, 'Agent not found');

  return result;
};

const deleteAgent = async (id: string) => {
  const result = await Agent.findByIdAndDelete(id);
  if (!result) throw new AppError(404, 'Agent not found');

  return result;
};

const updatedStatus = async (id: string, status: IAgent['status']) => {
  const result = await Agent.findByIdAndUpdate(id, { status }, { new: true });

  if (!result) throw new AppError(404, 'Agent not found');

  return result;
};

export const agentService = {
  requestAgent,
  getAllAgent,
  getSingleAgent,
  updatedAgent,
  deleteAgent,
  updatedStatus,
};
