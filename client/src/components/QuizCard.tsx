import React, { useState, useEffect } from 'react';
import { 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    Button, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from 'react-router-dom';
import './styles.css';
import { useUser } from '../contexts/userContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { deleteQuiz, getQuizSize } from '../services/quizSurvice';


interface QuizCardProps {
    title: string,
    author: string,
    _id: string
}

const QuizCard : React.FC<QuizCardProps> = ({title, author, _id}) => {
    const {user} = useUser();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [length, setLength] = useState(0);
    const[showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = async () => {
        await deleteQuiz(_id);
        window.location.reload();
    }

    useEffect(() => {
        getQuizSize(_id)
            .then(QuizLength => {
                setLength(QuizLength.length);
            })
    }, []);

    return (
        <>
            <Card className='card' variant='outlined' sx={{
                margin: 5,
                color: '#111',
                maxWidth: 275,
                height: 'fit-content',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'

            }}>
                <React.Fragment>
                    <CardContent sx={{
                        margin: '10px',
                        height: '100px',
                    }}>
                        <Typography 
                        className="title" 
                        sx={{
                            fontSize: 20,
                            color: "#333",
                            fontWeight: 'bolder'
                        }} 
                        color="text.secondary" 
                        gutterBottom>
                        {title}
                        </Typography>

                        <Typography sx={{
                            mb: 1.5,
                            color: '#333',
                            fontSize: 14 
                        }}>
                        This Quiz is Created by user
                        <Link to='/' className='user'> {author} </Link>
                        </Typography>
                        <Typography sx={{
                            mb: 1.5,
                            color: '#333',
                            fontSize: 14  
                        }}>
                        Contains {length} Questions
                        </Typography>
                    </CardContent>
                    <CardActions sx={{display: 'flex', gap: 2}}>
                        <Button 
                            sx={{marginTop: 2, marginBottom: 2}} 
                            variant='contained'
                            component={Link}
                            to={`/quiz/${_id}`}
                            >
                                Do Quiz
                        </Button>
                        {author===user.name && (<Button 
                            sx={{marginTop: 2, marginBottom: 2}} 
                            variant='contained'
                            color="error"
                            onClick={() => {setShowDeleteDialog(true)}}
                            startIcon={<DeleteForeverIcon />}
                            >
                                delete
                        </Button>)}
                    </CardActions>
                </React.Fragment>
            </Card>
            <Dialog 
            sx={{
                textAlign: 'center',
                alignSelf: 'center',
                justifySelf: 'center',
                maxWidth: '200px',
            }}
            fullScreen={fullScreen}
            open={showDeleteDialog}
            onClose={() => {setShowDeleteDialog(false)}}
            aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                {"ARE YOU SURE"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    This will permenently delete this quiz
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={() => {setShowDeleteDialog(false)}}>
                    cancel
                </Button>
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={handleDelete} 
                    autoFocus
                >
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default QuizCard; 