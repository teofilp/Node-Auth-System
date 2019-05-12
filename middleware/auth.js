const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async function(req, res, next){

    try{

        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'someRandomSecret');
        const user = User.findOne({_id: decoded._id});

        if(!user)
            throw Error();

        req.token = token;
        req.user = user;
        next();

    } catch(err){
        res.status(403).send('Please authenticate first');
    }
    
}

module.exports = auth;