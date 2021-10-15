const { google } = require("googleapis");
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/eze", { useNewUrlParser: true })
const Phone = require("../models/buyRequest");
const sellPhone = require("../models/sellRequest");

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

const pullData = async(req, res) => {
    try{
        const { sheets } = await authentication();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: id,
            range: 'A1:J7'
        })
        let rawArray = response.data["values"]
        rawArray.splice(0, 2);
        rawArray.splice(1, 1);
        const quality = ['New', 'A1', 'A2', 'B1', 'B2', 'C', 'C/B', 'C/D']
        const nameOfPhone = rawArray[0][0];
        const sixtyFour = rawArray[1].splice(2).map((e, i) => quality[i] + ": " + e);
        const twoFiveSix = rawArray[2].splice(2).map((e, i) => quality[i] + ": " + e);
        const fiveOneTwo = rawArray[3].splice(2).map((e, i) => quality[i] + ": " + e);
        const newPhone = new Phone({
            nameOfPhone: nameOfPhone,
            "64GB": sixtyFour,
            "256GB": twoFiveSix,
            "512GB": fiveOneTwo
        });
        await newPhone.save();
        res.send(newPhone); 
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

module.exports = pullData;