const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://kvaryan2708:aryan420@cluster1.hdx3pzq.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);
const Image = require('./models/Image');
const Msg = require('./models/Msg');
const Password = require('./models/Password');
const Request=require('./models/Request')
const Friends=require('./models/Friends')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get('/', async (req, res) => {


	res.json({message:"Hello World"});
});
app.get('/msg/:name', async (req, res) => {
	const name=req.params.name;
	const msg = await Msg.find({name:name,to_bool:false});

	res.json(msg);
});
app.put('/msg/update/:id', async (req, res) => {
	
	const msg = await Msg.findById(req.params.id);
	msg.to_bool=true;
	msg.save();

	res.json(msg);
});
app.get('/myMsg/:by', async (req, res) => {
	const by=req.params.by;
	const msg = await Msg.find({by:by,by_bool:false});

	res.json(msg);
});
app.put('/myMsg/update/:id', async (req, res) => {
	
	const msg = await Msg.findById(req.params.id);
	msg.by_bool=true;
	msg.save();

	res.json(msg);
});

app.get('/friends/:id', async (req, res) => {
	const id=req.params.id;
	const friendList = await Friends.findOne({id});

	res.json(friendList.friends);
});


app.post('/msg/new', async(req,res) => {
	const msg = new Msg({
		name:req.body.name,
		by:req.body.by,
		message: req.body.message
	})

	msg.save();

	res.json(msg);
})
app.post('/request/:id', async(req,res) => {
	const user=await Password.findById(req.params.id);
	const request = new Request({
		from:req.body.from,
		to:user.id
		
	})
	request.save();
   const user1=await Friends.findOne({id:req.body.from});
   user1.sentReq.push(user.id);
   await user1.save();
   const user2=await Friends.findOne({id:user.id});
   user2.sentReq.push(req.body.from);
   await user2.save();
 
	

	res.json(request);
})
app.get('/viewReq/:to', async (req, res) => {
	const to=req.params.to;
	const msg = await Request.find({to,status:{$ne:true}});
	
    
	res.json(msg);
});
app.put('/accept/:id', async (req, res) => {
	const user=await Request.findById(req.params.id);
	user.status=true;
	user.save();
	const user1=await Friends.findOne({id:user.from});
	user1.friends.push(user.to);
	const user2=await Friends.findOne({id:user.to});
	user2.friends.push(user.from);
	user1.save();user2.save();

	res.json({ success: true, message: 'Friend request accepted successfully' });
});

app.post('/login', async (req, res) => {
	const { id, password } = req.body;
  
	try {
	  // Find the user by ID
	  const user = await Password.findOne({ id });
  
	  // Check if the user exists
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  // Compare the provided password with the stored hashed password
	//   const passwordMatch = await bcrypt.compare(password, user.password);
  
	  if (password==user.password) {
		const token = jwt.sign({ userId: user._id }, 'abcd', { expiresIn: '1h' })
		res.json({ token,message: 'Login successful' ,name:user.name,image:user.image});
	  } else {
		res.status(401).json({ message: 'Invalid password' });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
  });

app.get('/profile/:id', async (req, res) => {
	const id =req.params.id;
	
	const data=await Friends.findOne({id});
	const msg = await Password.find({id:{$ne:id ,$nin:data.sentReq}});

	res.json(msg);
});
app.get('/getImage/:id', async (req, res) => {
	const id =req.params.id;
	
	
	const msg = await Image.findOne({id:id});

	res.json(msg.image);
});
app.post('/profile/new', upload.single('image'), async(req,res) => {


	const { id, password } = req.body;
	const imageData = req.file;
  
	try {
	  // Find the user by ID
	  const user = await Password.findOne({ id });
  
	  // Check if the user exists
	  if (user) {
		return res.status(404).json({ message: 'User  found' });
	  }
  
	  // Compare the provided password with the stored hashed password
	//   const passwordMatch = await bcrypt.compare(password, user.password);
  
	  const pass = new Password({
		id:req.body.id,
		name:req.body.name,
		password: req.body.password,
		image: imageData.buffer.toString('base64')
		
	})
	
	 pass.save();

	 const img=new Image({
		id:req.body.id,
		image:imageData.buffer.toString('base64')
	 })
 img.save();
	 
	 const msg = new Friends({
	 id:req.body.id,
	 friends:[],
	 sentReq:[]
	 })
 
	 msg.save();
 
	 
	 const token = jwt.sign({ userId: pass._id }, 'abcd', { expiresIn: '1h' });
	 res.setHeader('Content-Type', 'application/json');
		res.json({message:"Account Created",image:pass.image,token });
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
})
app.listen(3001);