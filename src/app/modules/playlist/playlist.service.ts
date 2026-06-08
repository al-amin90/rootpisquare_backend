import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary";
import type { TPlaylist } from "./playlist.interface";
import { PlaylistModel } from "./playlist.model";

const createPlaylistIntoDB = async (
  body: TPlaylist,
  imageFiles: Express.Multer.File[],
) => {
  const subjects = body.subjects ?? [];

  // Upload each subject's image by matching array index
  const uploadedSubjects = await Promise.all(
    subjects.map(async (subject, index) => {
      const file = imageFiles[index]; // index-based matching

      if (file) {
        const imageUrl = await uploadOnCloudinary(
          file.path,
          "playlists", // folder inside Cloudinary
        );
        return { ...subject, image: imageUrl ?? "" };
      }

      return subject; // no image for this subject, keep as-is
    }),
  );

  const result = await PlaylistModel.create({
    className: body.className,
    subjects: uploadedSubjects,
  });

  return result;
};

const getAllPlaylistFromDB = async () => {
  const result = await PlaylistModel.find().populate([
    { path: "className" },
    { path: "subjects.subjectName" },
  ]);
  return result;
};

const getSinglePlaylistFromDB = async (id: string) => {
  const result = await PlaylistModel.findById(id).populate([
    { path: "className" },
    { path: "subjects.subjectName" },
  ]);
  return result;
};

const updatePlaylistInDB = async (
  id: string,
  body: Partial<TPlaylist>,
  imageFiles: Express.Multer.File[],
) => {
  const existing = await PlaylistModel.findById(id);
  if (!existing) throw new Error("Playlist not found");

  // Merge incoming subjects with existing ones
  const incomingSubjects = body.subjects ?? [];

  const updatedSubjects = await Promise.all(
    incomingSubjects.map(async (subject, index) => {
      const file = imageFiles[index];

      if (file) {
        // Delete old image from Cloudinary if it exists
        const oldSubject = existing.subjects[index];
        if (oldSubject?.image) {
          await deleteFromCloudinary(oldSubject.image);
        }

        const imageUrl = await uploadOnCloudinary(
          file.path,
          "playlists",
          "root-pi-square",
        );
        return { ...subject, image: imageUrl ?? subject.image };
      }

      // No new image uploaded — keep the existing image URL
      const oldSubject = existing.subjects[index];
      return { ...subject, image: subject.image || oldSubject?.image || "" };
    }),
  );

  const result = await PlaylistModel.findByIdAndUpdate(
    id,
    {
      ...(body.className && { className: body.className }),
      subjects: updatedSubjects,
    },
    { new: true, runValidators: true },
  );

  return result;
};

const deletePlaylistFromDB = async (id: string) => {
  const result = await PlaylistModel.findByIdAndDelete(id);
  return result;
};

export const playlistServices = {
  createPlaylistIntoDB,
  getAllPlaylistFromDB,
  getSinglePlaylistFromDB,
  updatePlaylistInDB,
  deletePlaylistFromDB,
};
