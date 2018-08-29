const express = require('express');
const app = express();

let port = require('./config.json').port || 3000;
app.set('port', port);

const session = require('express-session');

app.set('view engine', 'ejs');
app.use(session({
    genid: (req) => {
        return genuuid();
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 604800000,
    },
    expires: 604800000,
}));
require('./router')(app);

app.listen(port, () => console.info(`Listening on port ${port}`));