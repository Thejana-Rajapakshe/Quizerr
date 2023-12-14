import { useState } from 'react';
import { TextField, Button, Stack, Snackbar, Alert } from '@mui/material';
import { signin } from '../services/authSurvice';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { setUserData } from '../utils/localStorage';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const {signInUser} = useUser();
  const navigate = useNavigate();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    
    const result = await signin(email, password);
    setMessage(result.error);
    
    if(result.user?.email === email){
      signInUser(result.user);
      setUserData(result.user);
      navigate('/');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', marginTop: '3rem' }}>
      <h2>Sign In</h2>
      <Stack spacing={2} direction="column" alignItems="center">
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={(e) => {handleSignIn(e)}}>
          Sign In
        </Button>
      </Stack>
      {message!=='' && (
      <Snackbar 
        anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
        open={true} 
        autoHideDuration={6000} >
        <Alert severity="error" sx={{ width: '100%' }}>
          <>{message}</>
        </Alert>
      </Snackbar>)}
    </div>
  );
};

export default SignIn;