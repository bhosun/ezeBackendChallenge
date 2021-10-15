const express = require("express")
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

const pullData = require("./controllers/pullPhonesController.js");
const getPhones = require("./controllers/getPhones.js");

const app = express()
app.use(bodyParser.json());

app.get("/google", pullData);
app.get("/get", getPhones);

app.listen(port, () => {
	console.log("Server has started!")
})