import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: "please enter a title for the quiz"
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: "an author is required to creat a quiz",
    },

    userName: {
        type: String,
    },

    tags: {
        type: [String]
    },
    
    // questions: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId, 
    //         ref: 'Question',
    //         required: "questions required"
    //     }],
  });

export default mongoose.model("Quiz", quizSchema);