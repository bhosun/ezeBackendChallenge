const Phone = require("../models/buyRequest");
const sellPhone = require("../models/sellRequest");

const getPhones = async (req, res) => {
    const { title } = req.body;
    if(title == "buyRequest") {
        // support PAGINATION
        Phone.find({ limit: 2 }, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                res.send(data);
            }
        })
    } else {
        sellPhone.find({}, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                res.send(data);
            }
        })
    }
};

module.exports = getPhones;