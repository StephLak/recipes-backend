import express from 'express';
import { currentUser } from '../../shared/middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.status(200).send({ currentUser: req.currentUser || null });
})

export { router as currentUserRouter };