import express from 'express';
import jobControllers from '../controllers/job.js';

const router = express.Router();

router.get('/jobs', jobControllers.getAllJobs);

router.get('/job/:id', jobControllers.getJobById);
router.post('/job', jobControllers.createJobById);
router.put('/job/:id', jobControllers.updateJobById);
router.delete('/job/:id', jobControllers.deleteJobById);
router.get('/jobs/search', jobControllers.searchJobs);

export default router;
