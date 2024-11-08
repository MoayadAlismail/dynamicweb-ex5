// import { initializeApp } from "firebase/app";

const express = require("express");
const firebase = require("firebase/app")
const app = express();
const port = 3000;

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "exercise-five-f6c2f.firebaseapp.com",
  projectId: "exercise-five-f6c2f",
  storageBucket: "exercise-five-f6c2f.firebasestorage.app",
  messagingSenderId: "518740793959",
  appId: "1:518740793959:web:c3c2b71fc9bdd98c5e12c2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const indexRoute = require("./routes/index.js");
const createPostRoute = require("./routes/createPost.js");
const singlePostRoute = require("./routes/singlePost.js");

app.use('/', indexRoute);
app.use('/create',createPostRoute);
app.use('/post',singlePostRoute);
app.use(express.static("public"));

app.listen(port, () =>{
    console.log(`Exercise Five app listening on port ${port}`);
});

module.exports = app