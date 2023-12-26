const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
     
	id: {
		type: String,
		required: true
	},
   friends:[{
    type:String,
    required:true
   }],
   sentReq:[{
    type:String,
    required:true
   }]
	
});


const Friends = mongoose.model("Friends", FriendsSchema);



module.exports = Friends;