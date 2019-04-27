const express = require('express');

const app = express();
app.use(express.static('./dist'));

const port = process.env.PORT || 8010;

app.listen(port);