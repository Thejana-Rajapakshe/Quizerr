async function signin (email: string, password: string) {
    const url = 'http://localhost:3000/api/auth/signin';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return errorData;
        }
    
        let data = '';
        if(response.ok) data = await response.json();
        return data;
    } catch (error : any) {
        // console.error('Login error:', error.message);
        alert('An unexpected error occurred during signing in');    
        return error;
    }
};

async function signout () {
    const url = 'http://localhost:3000/api/auth/signout';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        return response;
    } catch (error : any) {
        alert('An unexpected error occurred during signing out')
        console.error(error);
    }
};
  


  export {signin, signout}