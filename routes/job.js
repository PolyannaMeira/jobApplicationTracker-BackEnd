import express from 'express';
import multer from 'multer';
import path from 'path';

import jobControllers from '../controllers/job.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// ✅ Apply token verification to all routes
router.use(verifyToken);

router.get('/jobs', jobControllers.getAllJobs);
router.get('/job/:id', jobControllers.getJobById);
router.post('/job', upload.single('attachment'), jobControllers.createJob);
router.put('/job/:id', jobControllers.updateJobById);
router.delete('/job/:id', jobControllers.deleteJobById);
router.get('/jobs/search', jobControllers.searchJobs);

export default router;
