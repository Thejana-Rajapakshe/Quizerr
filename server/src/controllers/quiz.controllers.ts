import Quiz from '../models/Quiz.model';
import Question from '../models/Question.model';
import errorHandler from '../utils/dbErrorHanglers'
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.model';

const create = async (req : Request, res: Response) => {
    const quiz = new Quiz(req.body);
    try {
        const newQuiz = await quiz.save();
        res.status(200).json({
            "message": "quizz created succefully!",
            "_id": newQuiz._id
        });
    } catch (error) {
        res.status(400).json({
            "error" : errorHandler.getErrorMessage(error)
        });        
    }
}

const list = async (req: Request, res: Response) => {
    try {
        const quiezzes = await Quiz.find();
        res.json(quiezzes)
    } catch (error) {
        res.json({
            "error" : errorHandler.getErrorMessage(error)
        })
    }
}

const getQuiz = async (req: any, res : any) => {
    try {
        const temp = await Quiz.find({_id: req.quiz._id}); const quiz = temp[0];
        const questions = await Question.find({quiz: req.quiz._id});
        if(!quiz || ! questions){
            res.status(400).json({
                "error" : "sorry, unable to load quiz"
            })
        }
        questions.forEach(element => {
            element.correctChoice = undefined;
        });
        res.json({quiz, questions})
    } catch (error) {
        res.status(400).json({
            "error" : "sorry, unable to load quiz"
        })
    }
}

const quizById = async (req: any, res: any, next: any, userId: mongoose.ObjectId) => {
    try {
        const quiz = await Quiz.find({"_id": userId})
        if(!quiz){
            res.status(400).json({
                "message" : "there's no such quiz"
            });
        }
        req.quiz = quiz[0];
    } catch (error) {
        res.status(400).json({
            "error" : errorHandler.getErrorMessage(error)
        })
    }
    next();
}

const getQuizSize = async (req: any, res: any) => {
    try{
        const questions = await Question.find({quiz: req.params.quizId});
        res.status(200).json({
            "length" : questions.length
        })
    } catch(error){
        res.status(400).json({
            "error" : errorHandler.getErrorMessage(error)
        })
    }
}

const deleteQuiz = async (req: any, res: any) => {
    try{
        const quiz = await Quiz.deleteOne({"_id" : req.body._id});
        const questions = await Question.deleteMany({"quiz": req.body._id});
        res.status(200).json({
            "message" : "quiz deleted succesfully"
        })
    } catch (error) {
        res.status(400).json({
            "error": errorHandler.getErrorMessage(error)
        })
    }
}

const getAnswers = async (req: any, res: any) => {
    let correctChoices : number[] = [];
    let userChoices = req.body.choices
    let score : number = 0;
    let scoreUpdated : boolean = false;
    
    try {
        const questions = await Question.find({quiz : req.quiz._id});
        if(!questions) res.status(400).json({
            "error" : "unable to load quesions"
        })
        questions.forEach(element => {
            correctChoices.push(element.correctChoice);
        });

        
        for(let i=0; i<correctChoices.length; i++){
            if(correctChoices[i] == userChoices[i]){
                score++
            }
        }
        
        if(req.body.userId != req.quiz.author){
            scoreUpdated = true;
            await User.updateOne({_id: req.body.userId}, {$inc: {score: score}});
        }

        res.status(200).json({
            "score": score,
            "updated" : scoreUpdated
        })
        
        
    } catch (error) {
        res.status(200).json({
            "error" : errorHandler.getErrorMessage(error)
        })
    }
    
}

export {create, list, quizById, getQuiz, getAnswers, deleteQuiz, getQuizSize}