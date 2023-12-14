import NavBar from '../components/NavBar';
import QuizCard from '../components/QuizCard';
import { getQuizes } from '../services/quizSurvice';
import {useEffect, useState} from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useUser } from '../contexts/userContext';
import LoginError from './loginError';

const Quizes = () => {
    const [quizzes, setQuizzes] = useState([]);
    
    const {user} = useUser();

    const Quizes = async () => {
        const quizes = await getQuizes();

    setQuizzes(quizes as never[]);
    }
    
    useEffect(() => {
        Quizes();
      }, []);
    
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
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: 0,
                    flexWrap: 'wrap'
                }}>
                    {quizzes.map((q: any, index) => (
                        <Box key={index} sx={{
                            // flex: '1 0 calc(20% - 20px)',
                            display: 'flex',
                            margin: 0,
                            flexDirection: 'column',
                            minWidth: 100,
                        }}>
                            <QuizCard title={q.title} author={q.userName} _id={q._id}/>
                        </Box> 
                    ))}
                </Box>
            </Container>
        </>
    )
}
export default Quizes;