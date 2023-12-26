const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PasswordSchema = new Schema({
    id:{
       type:String,
       required:true
    },
     
	name: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},
	image:{
		type:String,
		required:true
	}
	
});

const Password = mongoose.model("Password", PasswordSchema);
module.exports =Password;
