import {useState,useEffect} from 'react'
const api_base="http://localhost:3001"
function Login({toggleValue,helper,naming,imaging}) {


    const [id,setId]=useState("");
   
    const [password,setPassword]=useState("");
   
    const addAcc = async () => {
     const data = await fetch(api_base + "/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json" ,
         'Authorization': `Bearer ${localStorage.getItem('token')}`
       },
       body: JSON.stringify({
         id:id,
         
         password: password
       })
     });
     const result = await data.json();

     if (data.ok) {
       // Successful login
       localStorage.setItem('token', result.token);
       alert(result.message)
      //  localStorage.setItem('authToken', result.token);
      toggleValue();
      helper(id);
      naming(result.name);
      
      imaging(result.image)
      console.log(result.image);
       // You can redirect to another page or perform additional actions here
     } else {
       // Failed login
       alert(`Error: ${result.message}`);
       // You can display an error message to the user or take other actions
     }
     setId("");setPassword("");

	}
    return(
        <div className='popup'>
        <div className="content">
        <h3>Login</h3>
        <input type="text" placeholder="Id" className="add-todo-input" onChange={e => setId(e.target.value)} value={id} />

<input type="password" placeholder="Password" className="add-todo-input" onChange={e => setPassword(e.target.value)} value={password} />
        <div className="button" onClick={addAcc}>Log In</div>
    </div></div>
    
    );
}

export default Login;