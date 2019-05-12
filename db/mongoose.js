const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Auth', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if(err)
        return console.log(err);
    console.log('Connected!');
})

