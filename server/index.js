// Это используется толбко в тестах E2E
const express = require('express');

const app = express();
app.use(express.static('./dist'));

// develop - 8009
// master - 8010
const port = process.env.PORT_TEST || 8009;

app.listen(port);