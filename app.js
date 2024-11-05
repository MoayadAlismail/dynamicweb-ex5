const express = require("express");
const app = express();
const port = 3000;

const indexRoute = require("./route/index.js");
const createPostRoute = require("./route/createPostRoute.js");
const singlePostRoute = require("./route/singlePostRoute.js");

app.use('/', indexRoute);
app.use('/create',createPostRoute());
app.use('/singe',singlePostRoute());

app.listen(port, () =>{
    console.log(`Exercise Five app listening on port ${port}`);
});