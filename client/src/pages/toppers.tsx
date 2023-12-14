import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { getToppers } from "../services/userServices";
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from "../components/NavBar";
import LoginError from "./loginError";
import { useUser } from "../contexts/userContext";

interface User {
    email: string,
    userName: string,
    score: number
}

const Toppers = () => {
    const {user} = useUser();
    const [toppers, setToppers] = useState<User[]>([])

    const getData = () => {
        getToppers()
        .then((response : User[]) => {
                let data: User[] = [];
                response.forEach((topper : any) => {
                    data.push({email: topper.email, userName: topper.userName, score: topper.score});
                })
                setToppers(data);
            })
    } 
    
    
    useEffect(() => {
        getData();
    }, []);

    if(user.email === ''){
        return(
            <>
                <NavBar/>
                <LoginError/>
            </>
        )
    }

    return(
        <>
            <NavBar/>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {toppers.map((t: User, index: number) => (
                    <Grid xs={2} sm={4} md={4} key={index}>
                      <UserCard key={index} name={t.userName} email={t.email} score={t.score}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Toppers;