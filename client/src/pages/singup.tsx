import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import { createUser } from '../services/userServices';
import { signout } from '../services/authSurvice';
const SignUp = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const response = await createUser(userName, email, password);
        
        if(response.error){
            setMessage(response.error);
            return;
        }
        
        signout();
        navigate('/signin')
    };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8rem' }}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form style={{ width: '100%', maxWidth: '400px', marginTop: '1.5rem' }} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '1.5rem' }}
            onClick={(e) => {handleSubmit(e)}}
        >
          Sign Up
        </Button>
      </form>
      {message!=='' && (
      <Snackbar 
        anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
        open={true} 
        autoHideDuration={6000} >
        <Alert severity="error" sx={{ width: '100%' }}>
          <>{message}</>
        </Alert>
      </Snackbar>)}
    </Container>
  );
};

export default SignUp;