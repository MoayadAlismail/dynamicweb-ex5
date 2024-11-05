import { initializeApp } from "firebase/app";

const express = require("express");
const app = express();
const port = 3000;

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4oyX69Y2PONg0DzDOX4He9nQFP5QPr5U",
  authDomain: "exercise-five-f6c2f.firebaseapp.com",
  projectId: "exercise-five-f6c2f",
  storageBucket: "exercise-five-f6c2f.firebasestorage.app",
  messagingSenderId: "518740793959",
  appId: "1:518740793959:web:c3c2b71fc9bdd98c5e12c2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const indexRoute = require("./route/index.js");
const createPostRoute = require("./route/createPostRoute.js");
const singlePostRoute = require("./route/singlePostRoute.js");

app.use('/', indexRoute);
app.use('/create',createPostRoute());
app.use('/post',singlePostRoute());

app.listen(port, () =>{
    console.log(`Exercise Five app listening on port ${port}`);
});