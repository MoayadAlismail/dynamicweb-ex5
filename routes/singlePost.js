const express = require("express"); //import express
const router = express.Router(); // define a route
const firestore = require("firebase/firestore"); //init firestore
const db = firestore.getFirestore(); //create a ref to the db


router.get("/", (request, response) => {
    response.send("Single post");
});

router.get("/:postID", (requeset,response)=> {
    response.send("please include a Post ID");
})

router.get("/:postId", (request, response) => {
    const postID = request.params.postId;
    const postQuery = firestore.getDoc(Firestore.doc(db, "posts", postId));
    
    postQuery
    .then((res)=>{
        const post=res.data();
        if(!post) response.send({});
        response.send(post);
    })
    .catch((error) => {
        console.log(error);
        return response.send(error);
    });
});


module.exports = router;