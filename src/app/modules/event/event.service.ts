import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import { IEvent } from './event.interface';
import Event from './event.model';

const createEvent = async (payload: IEvent, video?: Express.Multer.File) => {
  if (video) {
    const videoUpload = await fileUploader.uploadToCloudinary(video);
    payload.video = videoUpload.secure_url;
  } else if (payload.video && payload.video.startsWith('https://')) {
    // Handle case where video is a URL
  } else {
    throw new AppError(400, 'Video is required');
  }
  const result = await Event.create(payload);
  if (!result) throw new AppError(400, 'Event creation failed');
  return result;
};

const getAllevents = async (options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const result = await Event.find({})
    .sort({ [sortBy]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await Event.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleEvent = async (id: string) => {
  const result = await Event.findById(id);
  if (!result) throw new AppError(404, 'Event not found');
  return result;
};

const updateEvent = async (
  id: string,
  payload: IEvent,
  video?: Express.Multer.File,
) => {
  if (video) {
    const videoUpload = await fileUploader.uploadToCloudinary(video);
    payload.video = videoUpload.secure_url;
  } else if (payload.video && payload.video.startsWith('https://')) {
    // Handle case where video is a URL
  }
  const result = await Event.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new AppError(404, 'Event not found');
  return result;
};

const deleteEvent = async (id: string) => {
  const result = await Event.findByIdAndDelete(id);
  if (!result) throw new AppError(404, 'Event not found');
  return result;
};

export const eventService = {
  createEvent,
  getAllevents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
