import React, {useEffect} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignIn from './pages/signin';
import Home from './pages/home'
import './App.css';
import { UserProvider, useUser } from './contexts/userContext';
import Quizes from './pages/quizes';
import CreateQuiz from './pages/create';
import Quiz from './pages/quiz';
import Score from './pages/score'
import SignUp from './pages/singup';
import Toppers from './pages/toppers'

function App() {
  const {user, signInUser} = useUser();
  
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/signin" Component={SignIn} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/quizzes" Component={Quizes} />
            <Route path="/create" Component={CreateQuiz} />
            <Route path="/quiz/:quizId" Component={Quiz} />
            <Route path="/quiz/:quizId/answers" Component={Score} />
            <Route path="/toppers" Component={Toppers}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
