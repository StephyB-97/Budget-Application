//piece of code to connect the node app
const express = require('express');
const app = express();
const port = 3000;

//piece of code to serve images, CSS files, and JS files in a directory named public:
app.use(express.static('public'));

//create a route

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})