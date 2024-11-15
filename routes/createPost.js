const express = require("express");
const path = require("path")
const router = express.Router();
const firestore = require("firebase/firestore");
const db = firestore.getFirestore();

router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "../public", "form.html"));
});

router.get('/submit', (request, response) => {
    const { title, postText, author } = request.query;
    
    if (!title || !postText || !author) {
        return response.send({ error: 'sorry, invalid.' });
    }
    
    const idFromTitle = title.replace(/\s+/g, "-").toLowerCase();
    
    const setBlogPost = firestore.setDoc(
        firestore.doc(db, "posts", idFromTitle),
        {
            title,
            text: postText,
            author,
        }
    );

    setBlogPost
        .then(() => {
            response.sendFile(path.join(__dirname, "../public", "success.html"));
        })
        .catch((error) => {
            response.send(`Error submitting: ${error.toString()}`);
        });
});

module.exports = router;