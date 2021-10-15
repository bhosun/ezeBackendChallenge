const express = require("express")
const bodyParser = require("body-parser");

const Phone = require("./models/buyRequest");
const sellPhone = require("./models/sellRequest");

const pullData = require("./controllers/pullPhonesController.js");
const getPhones = require("./controllers/getPhones.js");

const app = express()
app.use(bodyParser.json());

app.get("/google", pullData);
app.get("/get", getPhones);

app.listen(5000, () => {
	console.log("Server has started!")
})