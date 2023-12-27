import {useState,useEffect} from 'react'
const api_base="http://localhost:3001"
function Create({toggleValue,helper,naming,imaging}) {


    const [id,setId]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [image, setImage] = useState(null);
   
    const addAcc = async () => {
      const formData = new FormData();
formData.append("id", id);
formData.append("name", name);
formData.append("password", password);
formData.append("image", image);
     const data = await fetch(api_base + "/profile/new", {
       method: "POST",
       headers: {
        
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
       body: formData
     });
     const result = await data.json();

     if (data.ok) {
       // Successful login
       alert(result.message);
       localStorage.setItem('token', result.token);
       toggleValue();
       helper(id);
       naming(name);
       imaging(result.image);
       console.log(result.image);
       // You can redirect to another page or perform additional actions here
     } else {
       // Failed login
       alert(`Error: ${result.message}`);
       // You can display an error message to the user or take other actions
     }
     setName("");
     setId("");setPassword("");setImage(null);

     
  
  };
  const handleImageChange = (e) => {
    // Set the selected image file to the state
    const file = e.target.files[0];
    setImage(file);

	}
    return(
        <div className='popup'>
        <div className="content">
        <h3>Create Account</h3>
        <input type="text" placeholder="Id" className="add-todo-input" onChange={e => setId(e.target.value)} value={id} />
<input type="text" placeholder="Name" className="add-todo-input" onChange={e => setName(e.target.value)} value={name} />
<input type="password" placeholder="Password" className="add-todo-input" onChange={e => setPassword(e.target.value)} value={password} />
<input type="file" accept="image/*" onChange={handleImageChange} />
        <div className="button" onClick={addAcc}>Create</div>
    </div></div>
    
    );
}

export default Create;