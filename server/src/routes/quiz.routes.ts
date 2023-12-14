import express from "express";
import * as quizCtrl from "../controllers/quiz.controllers"
import authCtrl from '../controllers/auth.controllers'

const router : express.Router = express.Router();

router.route('/api/quiz')
    .post(authCtrl.requireSignin, quizCtrl.create)
    .get(authCtrl.requireSignin, quizCtrl.list);

router.route('/api/quiz/:quizId')
    .get(authCtrl.requireSignin, quizCtrl.getQuiz)
    .delete(authCtrl.requireSignin, quizCtrl.deleteQuiz);

router.route('/api/quiz/:quizId/length')
    .get(authCtrl.requireSignin, quizCtrl.getQuizSize);

router.route('/api/answers/:quizId')
    .post(authCtrl.requireSignin, quizCtrl.getAnswers);

router.param('quizId', quizCtrl.quizById);

export default router;