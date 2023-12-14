import mongoose from "mongoose";

const questionSchema : mongoose.Schema = new mongoose.Schema({
    question: { 
        type: String, 
        required: "please enter a question" 
    },
    
    choices: {
        type: [String],
        required: "please enter 3 choises"
    },
    
    correctChoice: {
        type: Number, 
        required: "please mark the correct choise" 
    },

    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        required: "every quesion must be in a quiz"
    }
});

export default mongoose.model("Question", questionSchema);