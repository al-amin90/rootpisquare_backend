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
  body: any,
  imageFiles: Express.Multer.File[],
  deletedIndices: number[] = [],
) => {
  // Find existing playlist
  const existing = await PlaylistModel.findById(id);
  if (!existing) throw new Error("Playlist not found");

  // Parse subjects if it's a string
  let incomingSubjects = body.subjects;
  if (typeof incomingSubjects === "string") {
    incomingSubjects = JSON.parse(incomingSubjects);
  }

  // Handle deleted images
  for (const index of deletedIndices) {
    if (existing.subjects[index]?.image) {
      await deleteFromCloudinary(existing.subjects[index].image);
    }
  }

  // Create a map of new images to their indices
  const newImageMap = new Map<number, Express.Multer.File>();

  // If we have imageFiles array, we need to know which index each belongs to
  // This assumes the frontend sends images in the same order as subjects
  if (imageFiles && imageFiles.length > 0) {
    // Method 1: If images are sent in the same order as subjects that need updates
    let imageIndex = 0;
    for (
      let i = 0;
      i < (incomingSubjects?.length || existing.subjects.length);
      i++
    ) {
      // Check if this subject should have a new image
      const shouldHaveImage =
        incomingSubjects?.[i]?.hasNewImage ||
        (!existing.subjects[i]?.image && imageIndex < imageFiles.length);

      if (shouldHaveImage && imageIndex < imageFiles.length) {
        newImageMap.set(i, imageFiles[imageIndex]);
        imageIndex++;
      }
    }
  }

  // Update each subject
  const updatedSubjects = await Promise.all(
    existing.subjects.map(async (existingSubject: any, index: number) => {
      // Get updated data for this index
      const updatedData = incomingSubjects?.[index];

      // Check if we have a new image for this index
      const newImageFile = newImageMap.get(index);

      let imageUrl = existingSubject.image;

      // Handle image update
      if (newImageFile) {
        // Delete old image if it exists
        if (existingSubject.image) {
          await deleteFromCloudinary(existingSubject.image);
        }

        // Upload new image
        const uploadedUrl = await uploadOnCloudinary(
          newImageFile.path,
          "playlists",
          "root-pi-square",
        );

        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      // Return updated subject
      return {
        subjectName: updatedData?.subjectName || existingSubject.subjectName,
        description: updatedData?.description || existingSubject.description,
        image: imageUrl,
      };
    }),
  );

  // Update the playlist
  const result = await PlaylistModel.findByIdAndUpdate(
    id,
    {
      ...(body.className && { className: body.className }),
      subjects: updatedSubjects,
    },
    { new: true, runValidators: true },
  ).populate("className subjects.subjectName");

  return result;
};

const deletePlaylistFromDB = async (id: string) => {
  const result = await PlaylistModel.findByIdAndDelete(id);
  return result;
};

const getPlaylistsByClassIDFromDB = async (classID: string) => {
  const result = await PlaylistModel.find({ className: classID }).populate([
    { path: "className" },
    { path: "subjects.subjectName" },
  ]);
  return result;
};

export const playlistServices = {
  createPlaylistIntoDB,
  getAllPlaylistFromDB,
  getSinglePlaylistFromDB,
  updatePlaylistInDB,
  deletePlaylistFromDB,
  getPlaylistsByClassIDFromDB,
};
