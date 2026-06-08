// cloudinary.ts (updated for memory storage)
import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "./extractPublicId";
import { Readable } from "stream";

cloudinary.config({
  secure: true,
});

// Convert buffer to base64 or stream to Cloudinary
export const uploadOnCloudinary = async (
  fileBuffer: Buffer,
  folderName: string,
  subdomain: string = "root-pi-square",
  originalname?: string,
): Promise<string | null> => {
  if (!fileBuffer) return null;

  try {
    // Upload from buffer instead of file path
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `sass-bazar/${subdomain}/${folderName}`,
          transformation: [
            { width: 800, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
          use_filename: true,
          unique_filename: true,
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      // Create a readable stream from buffer and pipe to Cloudinary

      const readableStream = new Readable();
      readableStream.push(fileBuffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });

    return (result as any).secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

// Alternative: Convert buffer to base64 and upload
// export const uploadOnCloudinaryBase64 = async (
//   fileBuffer: Buffer,
//   folderName: string,
//   subdomain: string = "root-pi-square",
// ): Promise<string | null> => {
//   if (!fileBuffer) return null;

//   try {
//     // Convert buffer to base64
//     const base64String = fileBuffer.toString("base64");
//     const dataURI = `data:image/jpeg;base64,${base64String}`;

//     const result = await cloudinary.uploader.upload(dataURI, {
//       folder: `sass-bazar/${subdomain}/${folderName}`,
//       transformation: [
//         { width: 800, crop: "limit" },
//         { quality: "auto" },
//         { fetch_format: "auto" },
//       ],
//       use_filename: true,
//       unique_filename: true,
//       overwrite: true,
//     });

//     return result.secure_url;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return null;
//   }
// };

export const deleteFromCloudinary = async (
  imageUrl: string,
): Promise<boolean> => {
  try {
    const publicId = extractPublicId(imageUrl);
    if (!publicId) return false;

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
};

export const deleteManyFromCloudinary = async (
  imageUrls: string[],
): Promise<void> => {
  await Promise.all(imageUrls.map((url) => deleteFromCloudinary(url)));
};
