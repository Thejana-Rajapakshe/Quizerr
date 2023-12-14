import express from 'express';
import authCtrl from '../controllers/auth.controllers';

const router = express.Router();

router.route('/api/auth/signin')
    .post(authCtrl.signin);

router.route('/api/auth/signout')
    .get(authCtrl.requireSignin, authCtrl.signout);

export default router;
