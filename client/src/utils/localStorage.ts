const setUserData = (data : {email: string, name: string, _id: string}) => {
    localStorage.setItem('userName', data.name);
    localStorage.setItem('email', data.email);
    localStorage.setItem('_id', data._id);
}

const getUserData = () => {
    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('email');
    const _id = localStorage.getItem('_id'); 
    if(userName && email && _id){
        return {
            email: email,
            name: userName,
            _id: _id
        };
    }else{
        return {
            email: '',
            name: '',
            _id: ''
        };
    }

}

export {setUserData, getUserData};
