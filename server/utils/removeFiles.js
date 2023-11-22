import fs from 'fs/promises';
import path from 'path';

export async function removeFileFromDirectory(directoryPath, fileName) {
    try {
      const filePath = path.join(directoryPath, fileName);
      await fs.unlink(filePath);
      console.log(`File ${fileName} removed from ${directoryPath}`);
    } catch (error) {
      console.error(`Error removing files: ${error.message}`);
    }
}
