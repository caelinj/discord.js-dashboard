const express = require('express');
const app = express();

let port = require('./config.json').port || 3000;
app.set('port', port);

app.set('view engine', 'ejs');
require('./router')(app);

app.listen(port, () => console.info(`Listening on port ${port}`));