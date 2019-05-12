const User = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/users', auth, (req, res) => {
    User.getUsers(docs => {
        res.send(docs);
    }, (err) => {
        res.status(400).send(err);
    })
});

router.post('/users/login', async (req, res) => {
    let user = await User.findByCredentials(req.body.email, req.body.password);
    if(!user)
        return res.status(404).send('Unable to login');
    const token = await user.generateAuthToken();
    res.send({user, token});
});

module.exports = router;