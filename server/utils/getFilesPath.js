import fs from 'fs/promises';
import path from 'path';

export async function getFilesPath(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);

    // Filter files to include only those with a .pdf extension
    const pdfFilePaths = files
      .filter((file) => file.endsWith('.pdf'))
      .map((file) => path.join(directoryPath, file));

    return pdfFilePaths;
  } catch (error) {
    console.error(`Error reading directory: ${error.message}`);
    return [];
  }
}
