import { AppBar, Toolbar, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { signout } from "../services/authSurvice";
import { getUserData, setUserData } from "../utils/localStorage";
import { useEffect } from "react";

const NavBar = () => {
    const {signOutUser, signInUser, user} = useUser();
    useEffect(() => {
        const userData = getUserData();
        signInUser(userData);  
        console.log('App',user);
    }, []);
    
        const handleSignOut = async () => {
        signout()
        signOutUser();
        setUserData({name: '', email: '', _id: ''});
    }

    return(
        <AppBar position="static" sx={{marginBottom: 7}}>
                <Toolbar>
                    <Typography 
                    className="Logo" 
                    variant="h4"
                    component={Link}
                    to='/' 
                    sx={{ flexGrow: 1, fontWeight: 'bolder', textDecoration: 'none', color: '#fff' }}>
                        Quizzer
                    </Typography>
                    
                    <Button color="inherit" component={Link} to="/toppers">
                        Toppers
                    </Button>
                    
                    {user.email==='' && (
                        <>
                            <Button color="inherit" component={Link} to="/signin">
                                Sign in
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                Sign up
                            </Button>
                        </>
                    )}

                    {user.email!=='' && (
                        <>
                            <Button color="inherit" component={Link} to="/create">
                                Create Quiz
                            </Button>
                            <Button color="inherit" onClick={handleSignOut} >
                                Sign Out
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

    )
}

export default NavBar;