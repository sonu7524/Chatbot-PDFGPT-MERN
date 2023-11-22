import express from 'express';
import fs from 'fs/promises';
import multer from 'multer';
import { removeFileFromDirectory } from '../utils/removeFiles.js';  
import { getFilesPath } from '../utils/getFilesPath.js';
import { ingestMultipleDocs } from '../utils/loader.js';
const fileRouter = express.Router();
const uploadsDirectory = './uploads';
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
    try{
        await removeFileFromDirectory(uploadsDirectory, fileName);
        const pdfFilePaths = await getFilesPath(uploadsDirectory);
        await ingestMultipleDocs(pdfFilePaths);
        res.send({
            status: 200,
            message: 'File deleted successfully',
        })
    }
    catch(error){
        console.error(error);
        res.send({
            status: 500,
            message: 'Error deleting file',
        })
    }
  });

fileRouter.post('/upload', upload.array('pdfs',10), async (req, res) => {
    const files = req.files;
    try{
        const pdfFilePaths = await getFilesPath(uploadsDirectory);
        console.log(pdfFilePaths);
        ingestMultipleDocs(pdfFilePaths)
          .then(() => {
            console.log('Document processed successfully');
          })
          .catch((error) => {
            console.error('Error processing document:', error);
          });
        res.send({
            status: 200,
            message: 'Files uploaded successfully',
        })
    }
    catch(error){
        console.error(error);
        res.send({
            status: 500,
            message: 'Error uploading files',
        })
    }
});

export default fileRouter;