const express = require("express");
const path = require("path")
const router = express.Router();
const firestore = require("firebase/firestore"); //init firestore
const db = firestore.getFirestore(); //create a ref to the db


router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname,"../public", "form.html"));
});

router.get('/submit', (request, response)=>{
    const {title, postText, author} = request.query;
    if(!title || !postText || !author){
        response.send({error:'sorry, invalid.'});
    }
    
    const idFromTitle = title.replace(/\s+/g,"-").toLowerCase(); //strip out all spaces and replace it with a dash which allows us to create an ID for our title
    
    //submit data to Firebase
    const setBlogPost = firestore.setDoc(
        firestore.doc(db,"posts", idFromTitle),
        { title, text:postText, author, }
    );

    setBlogPost
    .then((res)=>{
        response.sendFile(path.join(__dirname,"../public", "success.html"));
    })
    .catch((error)=>{
        response.send(`Error submitting: ${error.toString()}`);
        });

    response.send(idFromTitle);
});

module.exports = router;