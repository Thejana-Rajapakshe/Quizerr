const getErrorMessage = (err : any) => {
    let message : String = '';
    if(err.code){
        switch (err.code) {
            case 11000:
                message = getUniqueErrorMassage(err);
                break;
            case 11001:
                message = getUniqueErrorMassage(err);
                break;        
            default:
                message = 'Something went wrong';
                break;
        }       
    } else{
        for(let errName in err.errors){
            if(err.errors[errName].message){
                message = err.errors[errName].message;
            }
        }
    }
    return message;
}

const getUniqueErrorMassage = (err : any) => {
    let output : String;
    try {   
        let filedName = 
        err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
        output = filedName.charAt(0).toUpperCase() + filedName.slice(1) + 'already exsists';
    } catch (err : any) {
        output = 'Unique field already exsists';
    }
    return output;
}

export default {getErrorMessage}
