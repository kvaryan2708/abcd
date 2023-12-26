const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MsgSchema = new Schema({
     
	name: {
		type: String,
		required: true
	},
    by:{
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	to_bool:{
		type:Boolean,
        default:false
	},
	to_bool:{
		type:Boolean,
        default:false
	},
	by_bool:{
		type:Boolean,
        default:false
	}
	
});


const Msg = mongoose.model("Msg", MsgSchema);



module.exports = Msg;