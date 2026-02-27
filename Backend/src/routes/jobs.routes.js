import {jobs} from '../controllers/jobs.controller.js'
import express from 'express'
import auth from '../middlewares/middleware.js'
const router=express.Router()

router.get('/',auth,jobs)

export default router