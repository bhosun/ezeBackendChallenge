const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const { google } = require("googleapis");

const Post = require("./models/buyRequest");

const app = express()
mongoose.connect("mongodb://localhost:27017/eze", { useNewUrlParser: true })
app.use(bodyParser.json());


// GOOGLE APIS

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
});

const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    const sheets = google.sheets({
        version: 'v4',
        auth: client
    });
    return { sheets }
}

const id = '1LuioJFCVm8PiIQY9JyM8luc5tKcsY6H47wCBOfCI3HI';

app.get("/google", async(req, res) => {
    try{
        const { sheets } = await authentication();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: id,
            range: 'B4:J7'
        })
        res.send(response.data);
        let rawArray = response.data["values"];
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

app.listen(5000, () => {
	console.log("Server has started!")
})