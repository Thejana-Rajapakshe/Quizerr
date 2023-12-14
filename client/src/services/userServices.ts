async function getUser(userId : string) {
    const url = `http://localhost:3000/api/users/${userId}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        
        if(!response.ok){
            const errorData = await response.json();
            const errorMessage = errorData.error;
            alert(errorMessage || "Unable to create quiz");
            return;
        }

        return response.json();
    } catch (error) {
        alert(error);
    }
}

async function createUser(userName: string, email: string, password: string) {
    const url = 'http://localhost:3000/api/users/';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password,
                score: 0
            })
        });

        if(!response.ok){
            const errorData = await response.json();
            return errorData;
        }

        return response.json();
    } catch (error : any) {
        alert('An unexpected error occurred during signingup out')
        console.error(error);
    }
}

async function getToppers() {
    const url="http://localhost:3000/api/users/toppers";
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(!response.ok){
            const errorData = await response.json();
            const errorMessage = errorData.error;
            alert(errorMessage || "Unable to create quiz");
        }

        return response.json();

    } catch(error) {
        alert(error)
    }
}

export {getUser, createUser, getToppers};