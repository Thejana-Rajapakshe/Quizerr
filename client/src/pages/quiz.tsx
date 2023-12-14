import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    Container,
    Radio,
    RadioGroup,
    FormControlLabel,
    Typography,
    FormControl,
    FormLabel,
  } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { getAnswers, getQuiz } from '../services/quizSurvice';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import LoginError from './loginError';
import { getUserData } from '../utils/localStorage';

interface Quizresult {
    score: number,
    updated: boolean
}

const Quiz = () => {
    let a: any;
    const navigate = useNavigate()
    const user = getUserData();
    const quizId = useParams();
    // const [result, setResult] = useState<Quizresult>({score: NaN, updated: false});
    const [quizInfo, setQuizInfo] = useState(a);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);

    const handleAnswerSelection = (questionIndex: any, option: any) => {
      setUserAnswers((prevAnswers : any) => {
        const newAnswers = [...prevAnswers];
        newAnswers[questionIndex] = option;
        return newAnswers;
      });
    };

    const handleSubmitQuiz = (e: any) => {
        e.preventDefault();
        getAnswers(user._id as string, quizId.quizId as string, userAnswers)
        .then(result => {
            const user = result;
            localStorage.setItem('score', user.score as unknown as string);
            localStorage.setItem('updated', user.updated as unknown as string);
            localStorage.setItem('outOf', quizInfo.questions.length);
            navigate(`/quiz/${quizId.quizId}/answers`);
        })
    };  

    useEffect(() => {
        let quiz : any;
        getQuiz(quizId.quizId as string)
        .then(result => {
            quiz = result;
            setQuizInfo(quiz);
            setLoading(false);
        })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false); 
          });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if(user.email === ''){
        return(
            <>
                <NavBar/>
                <LoginError />
            </>
        )
    }

    return (
        <>
            <NavBar/>
            <Container component="main" maxWidth="md">
            <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                {quizInfo.title}
                </Typography>
                {quizInfo.questions.map((question : any, index: number) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                    <Typography variant="h6">{question.question}</Typography>
                    <FormControl component="fieldset">
                    <FormLabel component="legend">Select your answer:</FormLabel>
                    <RadioGroup
                        name={`question-${index}`}
                        value={question.choices[userAnswers[index]-1] || ''}
                        >
                        {question.choices.map((choice: any, choiceIndex: number) => (
                            <FormControlLabel
                            key={choiceIndex}
                            value={choice}
                            control={<Radio />}
                            label={choice}
                            onChange={() => handleAnswerSelection(index, choiceIndex+1)}
                        />
                        ))}
                    </RadioGroup>
                    </FormControl>
                </div>
                ))}
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={(e) => {handleSubmitQuiz(e)}}
                >
                Submit Quiz
                </Button>
            </CardContent>
            </Card>
            </Container>
        </>
    );
};

export default Quiz;