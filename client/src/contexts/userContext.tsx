import { createContext, useContext, useState } from 'react';
// import { setUserData } from '../utils/localStorage';

const UserContext = createContext({user: {email:'', name:'', _id:''}, signInUser: (data: any)=>{}, signOutUser: ()=>{}});

export const UserProvider = ({children} : any) => {
    const [user, setUser] = useState({email:'', name:'', _id:''});

    const signInUser = (data: {email: string, name: string, _id: string}) => {
        console.log('userContext->signInUser', data);
        setUser(data);
        // setUserData(data);
    };

    const signOutUser = () => {
        setUser({email: '', name:'', _id:''});
        const data = {email:'', name:'', _id:''}
    };

    return(
        <UserContext.Provider value={{user, signInUser, signOutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}
