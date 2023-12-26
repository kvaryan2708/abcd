const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequestSchema = new Schema({
    from:{
       type:String,
       required:true
    },
     
	to: {
		type: String,
		required: true
	},

	status: {
		type: Boolean,
		default:false
	},

	
});

const Request = mongoose.model("Request", RequestSchema);
module.exports =Request;