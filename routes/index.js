const express = require("express");
const router = express.Router();
const firestore = require("firebase/firestore");
const db = firestore.getFirestore();

router.get("/", (request, response) => {
    const postsQuery = firestore.getDocs(firestore.collection(db, "posts"));
    const postsArray = [];

    postsQuery
    .then((res) => {
        res.forEach((post) => {
            postsArray.push({ id: post.id, ...post.data() });
        });
        // Create an HTML string to display the posts
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Blog Posts</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .post {
                        margin-bottom: 20px;
                        padding: 15px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                    }
                    .create-button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>Blog Posts</h1>
                <a href="/create" class="create-button">Create New Post</a>
                ${postsArray.map(post => `
                    <div class="post">
                        <h2>${post.title}</h2>
                        <p><strong>Author:</strong> ${post.author}</p>
                        <p>${post.text}</p>
                        <a href="/post/${post.id}">Read More</a>
                    </div>
                `).join('')}
            </body>
            </html>
        `;
        response.send(html);
    })
    .catch((error) => {
        console.log(error);
        return response.send(error);
    });
});

module.exports = router;