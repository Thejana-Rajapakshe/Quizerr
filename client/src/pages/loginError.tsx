import { Button, Container, Typography } from '@mui/material';
import {Link} from 'react-router-dom';

function LoginError() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '2rem',
          marginBottom: '16px',
          textAlign: 'center',
          color: 'red'
        }}
      >
        You must login before accessing this page.
      </Typography>
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button variant="contained" color="primary" component={Link} to='/signin'>
          Sign In
        </Button>
        <Button variant="outlined" color="primary" component={Link} to='/signup'>
          Sign Up
        </Button>
      </div>
    </Container>
)}

export default LoginError;