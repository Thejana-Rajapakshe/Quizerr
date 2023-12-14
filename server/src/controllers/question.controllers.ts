import Question from '../models/Question.model'
import errorHandler from '../utils/dbErrorHanglers'
import { Request, Response } from 'express';

const create = async (req : any, res : any) => {
    const question = new Question(req.body);
    if(!req.body.choices){
        res.status(200).json({
            "error" : "please enter 3 choices"
        })
    }
    try {
        await question.save();
        res.status(200).json({
            "message" : "question created succefully!"
        })
    } catch (error) {
        res.status(400).json({
            "error": errorHandler.getErrorMessage(error)
        })
    }
}

const list = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find().select("question choices");
        res.json(questions)
    } catch (error) {
        res.json({
            "error" : errorHandler.getErrorMessage(error)
        })
    }
}

export {create, list}