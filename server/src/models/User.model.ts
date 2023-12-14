import mongoose from "mongoose";
import crypto from 'crypto';

const userSchema : mongoose.Schema = new mongoose.Schema({
    userName: {
        type: typeof("k"),
        trim: true,
        unique: "sorry, the user name is already taken :(",
        required: "please input all required information"
    },

    email: {
        type: typeof("k"),
        trim: true,
        unique: "an account with the same email already exsists",
        match: [/.+\@.+..+/, 'please fill a valid email address'],
        required: "please input all required information"
    },

    score: {
        type: typeof(1),
        required: "a score is required"
    },

    created: {
        type: typeof(Date.now()),
        default: Date.now
    },

    updated: typeof(Date.now()),

    hashed_password: {
        type: typeof("k"),
        required: "please input all required information"
    }, 

    salt: typeof("k")
})

userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plaintext: String) {
        return this.encryptPassword(plaintext) === this.hashed_password;
    },
    
    encryptPassword: function(password: string){
        if(!password) return;
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return ''
        }
    },

    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },   
}

userSchema.path('hashed_password').validate(function(v){
    if(!this._password && this._password.length < 6){
        this.invalidate('password', 'Password must contain more than 6 characters');
    }
    if(this.isNew && !this._password){
        this.invalidate('password', 'Password is Required');
    }
}, undefined);

export default mongoose.model("User", userSchema);