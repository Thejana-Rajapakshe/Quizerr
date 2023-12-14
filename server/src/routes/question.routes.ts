import express from 'express';
import * as questionCtrl from '../controllers/question.controllers';
import authCtrl from '../controllers/auth.controllers';

const router = express.Router();

router.route('/api/question')
    .post(authCtrl.requireSignin, questionCtrl.create)


export default router;