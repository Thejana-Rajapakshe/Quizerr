import React, { useState } from "react";
import "./styles.css"
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { createQuiz, createQuestion } from "../services/quizSurvice";
import { getUserData } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import LoginError from "./loginError";

interface question {
    question: string,
    options: string[],
    correctOption: number
}

const CreateQuiz = () => {
    const[question, setQuestion] = useState('');
    const[quizName, setQuizName] = useState('');
    const[options, setOptions] = useState(['','','']);
    const[correctOption, setCorrectOption] = useState(1);
    const[quizQuestions, setQuizQuestions] = useState<question[]>([]);
    const[isQuestionValid, setIsQuestionValid] = useState(true); 
    const[isQuizValid, setIsQuizValid] = useState(true);
    const navigate = useNavigate() 
    const user = getUserData(); 


    const handleCorrectOption = (e : number) => {
        switch (e) {
            case 1:
                setCorrectOption(1);
                break;
            case 2:
                setCorrectOption(2);
                break;
            case 3:
                setCorrectOption(3);
                break;
            default:
                break;
        }
    } 

    const handleOptions = (index: number, e : string) => {
        setOptions(prevOptions => {
            let newOptions = [...prevOptions];
            newOptions[index] = e;
            return newOptions;
        });
    }

    const addQuestion = () => {
        let count = 0;
        if(question!=='') {
            options.forEach(option => {
                if(option !== '') {
                    count++
                };
            })
            if(count === 3){ 
                setIsQuestionValid(true);
            }else{
                setIsQuestionValid(false);
                return;
            }
        }else {
            setIsQuestionValid(false);
            return;
        }

        if(!isQuestionValid) return;

        const newQuestion : question = {
            question,
            options,
            correctOption
        }
        setQuizQuestions(prvQuestions => {
            let newQuestions = [...prvQuestions];
            newQuestions.push(newQuestion as never);
            setIsQuestionValid(true); setIsQuizValid(true);
            return newQuestions;
        });
    }

    const removeQuestion = (index: number) => {
        setQuizQuestions(prvQuestions => {
            let newQuestions = [...prvQuestions];
            newQuestions.splice(index, 1);
            return newQuestions;
        });
    }
    

    const addQuiz = async (e: React.MouseEvent) => {
        e.preventDefault();
        if(quizName ==='' || quizQuestions.length===0){
            setIsQuizValid(false);
            return;
        }else{
            setIsQuizValid(true);
        }


        const quizInfo = await createQuiz(quizName, user);
        if(!quizInfo) {
        };
        if(quizInfo){
            quizQuestions.forEach(questionInfo => {
                createQuestion(questionInfo, quizInfo._id);
                navigate('/quizzes');
            })
        }
    }

    if(user.email === ''){
        return(
            <>
                <NavBar/>
                <LoginError />
            </>
        )
    }

    return(
            <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
              <Box sx={{display: 'flex', gap: 2}}>
                <Typography variant="h5" gutterBottom>
                  Quiz Creator
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {addQuiz(e)}}
                  startIcon={<AddCircleIcon />}
                >
                    Add Quiz
                </Button>
                {!isQuizValid && (
                    <Snackbar 
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} 
                        open={true} 
                        autoHideDuration={6000} >
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Please enter a name for the quiz and add some questions
                        </Alert>
                </Snackbar>)}
                <FormControl fullWidth margin="normal">
                    <TextField
                      label="Quiz name"
                      variant="outlined"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                    />
              </FormControl>
              </Box>
        
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Question"
                  variant="outlined"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </FormControl>
        
              <Box sx={{display: 'flex'}}>
                {options.map((option, index) => (
                  <ListItem key={index} sx={{}}>
                    <ListItemText>
                      <TextField
                        label={`Option ${index + 1}`}
                        variant="outlined"
                        value={option}
                        onChange={(e) => handleOptions(index, e.target.value)}
                        required 
                      />
                    </ListItemText>
                  </ListItem>
                ))}
              </Box>
        
              <FormControl fullWidth margin="normal">
                <InputLabel>Correct Option</InputLabel>
                <Select
                  value={correctOption}
                  variant="outlined"
                  onChange={(e) => handleCorrectOption(e.target.value as number)}
                >
                    <MenuItem value={1}> {1}</MenuItem>
                    <MenuItem value={2}> {2}</MenuItem>
                    <MenuItem value={3}> {3}</MenuItem>
                </Select>
              </FormControl>
        
              <Button
                variant="contained"
                color="primary"
                onClick={addQuestion}
                startIcon={<AddCircleIcon />}
              >
                Add Question
              </Button>
        
              <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Quiz Preview
              </Typography>
        
              <List>
                {quizQuestions.map((q : question, index) => (
                  <Stack key={index} className="quizPreview">
                    <Box sx={{display: 'flex', gap: 10}}>
                        <Typography sx={{
                            fontSize:'1.3rem', 
                            fontWeight:'bolder'
                        }}>
                            {q.question}
                        </Typography>

                        <Button
                            sx={{textAlign: 'center'}}
                            variant="contained"
                            color="primary"
                            onClick={() => {removeQuestion(index)}}
                            startIcon={<RemoveCircleIcon />}
                        >    
                        </Button>
                    </Box>
                    <Box sx={{display: 'flex', gap: 10}}>
                    {(q.options as string[]).map((option, index) => (
                        <Typography key={index}>{index+1}. {option}</Typography>
                    ))}
                    </Box>
                  </Stack>
                ))}
              </List>
                {!isQuestionValid && (
                    <Snackbar 
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} 
                        open={true} 
                        autoHideDuration={6000} >
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Please provide a question and 3 options
                        </Alert>
                </Snackbar>)}
            </Paper>
    );
}

export default CreateQuiz;