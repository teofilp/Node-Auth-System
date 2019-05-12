const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    return jwt.sign({_id: user._id.toString}, "someRandomSecret");
}

userSchema.statics.createUser = function(user){
    bcrypt.hash(user.password, 8, (err, hash) => {
        console.log(hash);
        user.password = hash;
        user.save().then(doc => console.log(doc))
        .catch(err => console.log(err));
    });
}

userSchema.statics.getUsers = function(resolve, reject){
    User.find({}, (err, docs) => {
        if(err)
            return reject(err);
        resolve(docs);
    })
}
userSchema.statics.findByCredentials = async function(email, password){
    const user = await User.findOne({email});
    if(!user)
        return;

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
        return;
    

    return user;
}
const User = mongoose.model('user', userSchema);

module.exports = User;

