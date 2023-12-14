import User from '../models/User.model'
import extend from 'lodash/extend';
import errorHandler from '../utils/dbErrorHanglers';

const create = async (req : any, res : any, next : any) => {
    const user = new User(req.body);
    try {
        let userNameTaken = await User.findOne({userName: req.body.userName})
        if(userNameTaken){
            return res.status(200).json({
                "error" : "That user name is already taken!"
            })
        }
        let emailAdressTaken = await User.findOne({email: req.body.email});
        if(emailAdressTaken){
            return res.status(200).json({
                "error" : "An user with the email already exsists!"
            })
        }
        await user.save();
        return res.status(200).json({
            "message" : "User created succesfully!"
        })
    } catch(err) {
        return res.status(400).json({
            error : errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req : any, res : any) => {
    try{
        let users = await User.find().select('userName email created score');
        res.json(users);
    } catch (err) {
        res.status(400).json({
            error : errorHandler.getErrorMessage(err)
        })
    }

}

const listToppers = async (req: any, res: any) => {
    try{
        const toppers = await User.find().select('userName email score').sort({score: -1}).limit(10);
        if(!toppers) res.status(400).json({
            "error": "sorry, unable to load toppers"
        })
        toppers.forEach(topper => {
            topper.hashed_password = topper.salt = undefined;
        })
        res.status(200).json(toppers)
    } catch(error) {
        res.status(400).json({
            "error": errorHandler.getErrorMessage(error)
        })   
    }
}

const userByID = async (req : any, res : any, next : any, userId : String) => {
    try{
        let user = await User.findOne({_id: userId});
        if(!user){
            res.status(400).json({
                error: "User not found!"
            });
        }
        req.profile = user;
    } catch (err) {
        return res.status(400).json({
            error: "Unable to retrive user!"
        })
    }
    next();
}

const read = (req : any, res : any, next : any) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    res.send(req.profile);
}

const update = async (req : any, res : any, next : any) => {
    try {
        let user = req.profile;
        user = extend(user, req.body)
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req : any, res : any, next : any) => {
    try {
        let user = req.profile;
        let deletedUser : any = await User.findOneAndDelete(user);
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

export default {create, userByID, read, list, listToppers, remove, update}
