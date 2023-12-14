import {Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import NavBar from '../components/NavBar'; 
const Home = () => {
    const {user} = useUser();
    return(
        <>
            <NavBar/>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}>
                <Typography variant="h3" component="h1" sx={{marginBottom: '1rem'}}>
                  Welcome to Quizzer
                </Typography>
                <Typography variant="body1" sx={{marginBottom: '1rem'}}>
                  Engage your mind, elevate your knowledge! Competitive quizzes not only challenge your
                  understanding but also enhance cognitive abilities, memory, and problem-solving skills.
                  Join Quizzer, the competitive quizzing platform, and experience the thrill of learning in a fun way.
                </Typography>
                {user.email!=='' &&
                    <Button
                    component={Link}
                    to='/quizzes'
                    variant="contained"
                    color="primary"
                    sx={{marginTop: '1rem'}}>
                        Start Solving
                    </Button>
                }
                {user.email==='' &&
                    <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to='/signin'
                    sx={{marginTop: '1rem'}}>
                        Sign In
                    </Button>
                }
            </Container>
        </>
        
    )
}

export default Home;