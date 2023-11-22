import fs from 'fs/promises';
import path from 'path';

export async function removeFilesInDirectory(directoryPath) {
    try {
      const files = await fs.readdir(directoryPath);
  
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
  
        // Check if it's a file (not a subdirectory)
        const stat = await fs.stat(filePath);
        if (stat.isFile()) {
          await fs.unlink(filePath); // Remove the file
          console.log(`Removed file: ${filePath}`);
        }
      }
      console.log(`All files removed from ${directoryPath}`);
    } catch (error) {
      console.error(`Error removing files: ${error.message}`);
    }
}
