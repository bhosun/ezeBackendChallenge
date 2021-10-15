const mongoose = require("mongoose")

const schema = mongoose.Schema({
    nameOfPhone: String,
    "64GB": [{ 
		type: String 
	}],
	"256GB": [{ 
		type: String 
	}],
	"512GB": [{ 
		type: String 
	}],
})

module.exports = mongoose.model("sellPhone", schema)