import React from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginError from './loginError';
import NavBar from '../components/NavBar';
import { useUser } from '../contexts/userContext';

const Score = () => {
    const { userId } = useParams();
    const {user} = useUser();

    const score = localStorage.getItem('score');
    const outOf = localStorage.getItem('outOf');


    const paperStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '64px',
    };

    if(user.email === ''){
        return(
            <>
                <NavBar/>
                <LoginError />
            </>
        )
}

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Your Score
      </Typography>
      {score !== null ? (
        <Typography variant="h1">{score}/{outOf}</Typography>
      ) : (
        <Typography variant="body1">is not available</Typography>
      )}
      <Button 
        sx={{marginTop: 5}} 
        variant="contained"
        component={Link}
        to='/quizzes'
        >
            Go back to quizzes</Button>
    </Container>
  );
};

export default Score;