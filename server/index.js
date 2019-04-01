const express = require('express');

const app = express();
app.use(express.static('./'));

let port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});