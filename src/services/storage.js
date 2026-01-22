import { uploadData, getUrl, remove } from 'aws-amplify/storage';

/**
 * Upload a receipt image to S3
 * @param {File} file - The file to upload
 * @param {string} assetId - The asset ID to associate with
 * @returns {Promise<string>} - The file URL
 */
export async function uploadReceipt(file, assetId) {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `receipts/${assetId}-${Date.now()}.${fileExtension}`;

    const result = await uploadData({
      path: fileName,
      data: file,
      options: {
        contentType: file.type,
      }
    }).result;

    // Get the public URL
    const urlResult = await getUrl({ path: fileName });
    return urlResult.url.toString();
  } catch (error) {
    console.error('Error uploading receipt:', error);
    throw error;
  }
}

/**
 * Upload a general image/document
 * @param {File} file - The file to upload
 * @param {string} folder - The folder to upload to (e.g., 'assets', 'profile')
 * @returns {Promise<string>} - The file URL
 */
export async function uploadFile(file, folder = 'uploads') {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${file.name}`;

    const result = await uploadData({
      path: fileName,
      data: file,
      options: {
        contentType: file.type,
      }
    }).result;

    // Get the public URL
    const urlResult = await getUrl({ path: fileName });
    return urlResult.url.toString();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Delete a file from S3
 * @param {string} fileKey - The file path/key in S3
 */
export async function deleteFile(fileKey) {
  try {
    await remove({ path: fileKey });
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

/**
 * Get a temporary URL for a file
 * @param {string} fileKey - The file path/key in S3
 * @returns {Promise<string>} - The temporary URL
 */
export async function getFileUrl(fileKey) {
  try {
    const urlResult = await getUrl({ path: fileKey });
    return urlResult.url.toString();
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
}
