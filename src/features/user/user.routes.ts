import express from 'express'
import { changePassword, getAllUser, getUserById, me, updateUser } from './user.controller.js';
import { authenticationMiddleware } from '../../middleware/authentication.middleware.js';


const router = express.Router();

router
    .route('/')
    .get(getAllUser)

router
    .route('/:id')
    .get(getUserById)

router
    .route('/update/:id')
    .put(authenticationMiddleware, updateUser)

router
    .route('/change-password')
    .put(authenticationMiddleware, changePassword)

router.get('/user/me', authenticationMiddleware, me)



export default router