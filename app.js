const app = require('./server/server');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});