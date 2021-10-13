const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

const Post = require("./models/buyRequest");

const app = express()
mongoose.connect("mongodb://localhost:27017/eze", { useNewUrlParser: true })
app.use(bodyParser.json());

app.post("/get", async (req, res) => {
    const { title, content } = req.body;
    if(!title) {
        res.send("hello no title");
    }
    const newPost = new Post({
        title: title,
        content: content
    })
    await newPost.save()
    res.send(newPost)
})

app.listen(5000, () => {
	console.log("Server has started!")
})