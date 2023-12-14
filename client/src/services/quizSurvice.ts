async function createQuiz(quizTitle: string, user: any) {
    const url = 'http://localhost:3000/api/quiz';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({'userName': user.name,'author': user._id, 'title': quizTitle}),
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

async function createQuestion(questionInfo: any, quizId: string) {
    const url = 'http://localhost:3000/api/question';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(
                {
                    'question': questionInfo.question,
                    'choices': questionInfo.options,
                    'correctChoice': questionInfo.correctOption,
                    'quiz': quizId
                }),
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

async function getQuizes() {
    const url = 'http://localhost:3000/api/quiz';
    try {
        const response = await fetch(url,{
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

        if(response.ok){return response.json()}
    } catch (error) {
        alert(error);
    }
}

async function getQuiz(quizId : string) {
    const url = `http://localhost:3000/api/quiz/${quizId}`
    try {
        const response = await fetch(url ,{
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

        if(response.ok){return await response.json()}
    } catch (error) {
        alert(error);
    }
}

async function getAnswers(userId: string, quizId: string, answers : number[]) {
    const url = `http://localhost:3000/api/answers/${quizId}`;
    try {
        const response = await fetch(url ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                'userID' : userId,
                'choices': answers
              })

        })
        

        if(!response.ok){
            const errorData = await response.json();
            const errorMessage = errorData.error;
            alert(errorMessage || "Unable to create quiz");
            return;            
        }

        if(response.ok){return response.json()}
    } catch (error) {
        alert(error);
    }    
}

async function deleteQuiz(quizId: string) {
    const url = `http://localhost:3000/api/quiz/${quizId}`
    try{
        const response = await fetch(url ,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                '_id' : quizId,
              })

        })

        if(!response.ok){
            const errorData = await response.json();
            const errorMessage = errorData.error;
            alert(errorMessage || "Unable to create quiz");
            return; 
        }

        return response.json();
    } catch(error) {
        alert(error);
    }
}

const getQuizSize = async (quizId: string) => {
    const url = `http://localhost:3000/api/quiz/${quizId}/length`;
    try{
        const response = await fetch(url ,{
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
    } catch(error) {
        alert(error);
    }
}

export {createQuiz, createQuestion, getQuizes, getQuiz, getAnswers, deleteQuiz, getQuizSize};