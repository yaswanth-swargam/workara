import express from 'express';
import auth from '../middlewares/middleware.js';
import { savedJobs, saveJob, removeJob } from '../controllers/savedJobs.controller.js';

const router = express.Router();

router.get('/', auth, savedJobs);
router.post('/:jobId', auth, saveJob);
router.delete('/:jobId', auth, removeJob);

export default router;