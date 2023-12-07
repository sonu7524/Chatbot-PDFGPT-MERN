import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from "./routes/auth.js";
import questionRoutes from "./routes/question.js";
import fileRoutes from "./routes/file.js";
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
})

app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', fileRoutes);
app.use('/api', questionRoutes);

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/', (req, res) => {
  res.send('PDFGPT Server is up and running!')
})
