import express from 'express';
import { createNewProfile, editProfile, getAllProfiles, getUserProfileById } from './profile.controller';


const router = express.Router();


router.get('/', getAllProfiles)
router.get('/user-profile/:id', getUserProfileById)
router.post('/', createNewProfile)
router.put('/:id', editProfile)

export default router