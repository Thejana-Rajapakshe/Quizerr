import User from '../models/User.model';
import jwt from 'jsonwebtoken';

const signin = async (req : any, res : any, next : any) => {
    try{
        let user = await User.findOne({"email" : req.body.email});
        if(!user){
            return res.status(401).json({error: "User not found"});
        }
        if(!user.authenticate(req.body.password)){
            return res.status(401).send({error: "Email and password don't match."});
        }

        const token = jwt.sign({_id: user._id}, "silly token DEBUG DEVMODE");
        res.cookie('t', token, {expire: (new Date() as unknown) as number + 99999999});

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.userName,
                email: user.email
            }
        })

    } catch (err) {
        return res.status('401').json({error: "Could't sign in"});
    }
}

const signout = (req : any, res : any, next : any) => {
    res.clearCookie("t")
    return res.status('200').json(
        {message: "Signed out"}
    );
}

const requireSignin = (req : any, res : any, next : any) => {
    const token = req.cookies?.t;
    if(!token) {
        return res.status('401').json({
            error: "Not Authenticated"
       });
    }
    

    jwt.verify(token, "silly token DEBUG DEVMODE", (err: any, decode: any) => {
        if(err){
            return res.status(401).json({
                message: "Failed to authenticate"
            });
        }

        req.auth = decode;
        next();
    });
}


const hasAuthorization = (req : any, res : any, next : any) => {
    const authorization =  
    (req.profile != undefined) && (req.auth != undefined) && (req.profile._id == req.auth._id);
    if(!authorization){
        return res.status(401).json({
            error: "User is not authorized"
        })
    }
   next();
}

export default {signin, signout, requireSignin, hasAuthorization}