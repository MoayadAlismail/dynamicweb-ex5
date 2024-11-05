const express = require("express");
const router= express.router();

router.get("/", (request, response) => {
response.send("Single post");
});