import express from 'express';
import jobControllers from '../controllers/job.js';

const router = express.Router();

router.get('/jobsDetails', async (req, res) => {
    try {
        const jobs = await jobControllers.getMyJobsDetails();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
    });

    export default router;