import express from 'express';
import fs from 'fs';
import multer from 'multer';
import { removeFilesInDirectory } from '../utils/removeFiles.js';  
import { getFilesPath } from '../utils/getFilesPath.js';
import { ingestMultipleDocs } from '../utils/loader.js';
const fileRouter = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });



fileRouter.delete('/delete/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
    const filePath = `./uploads/${fileName}`;
    const directory = process.env.DIR;
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error deleting file');
      } else {
        await removeFilesInDirectory(directory);
        let pdfFilePaths = await getFilesPath(uploadsDirectory);
        console.log(pdfFilePaths);
        await ingestMultipleDocs(pdfFilePaths);
        console.log(`File ${fileName} deleted successfully`);
        res.send('File deleted successfully');
      }
    });
  });

fileRouter.post('/upload', upload.array('pdfs',10), (req, res) => {
    const files = req.files;
    console.log(files);
   res.send({
      status: 200,
      message: 'Files uploaded successfully',
    })
});

export default fileRouter;