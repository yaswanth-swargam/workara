import express from 'express';
import auth from '../middlewares/middleware.js'
import {currentUser} from '../controllers/user.controller.js'

const router=express.Router()


router.get('/me',auth,currentUser);


export default router;