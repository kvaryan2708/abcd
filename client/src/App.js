import {useState,useEffect} from 'react'
import Navbar from "./Navbar"
import Logout from "./Logout"
import Friends from "./Friends"
import Requests from "./Requests"
import Login from "./Login"
import Sent from "./Sent"
import Explore from "./Explore"
import Create from "./Create"
import Navbar2 from "./Navbar2"
import Send from "./Send"
import View from "./View"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const api_base="http://localhost:3001"

function App() {
  const [value,setValue]=useState(true);
  const [auth,setAuth]=useState(null);
  const toggleValue = () => {
    setValue((prevValue) => !prevValue);
  };
  const [byValue,setByValue]=useState("");
  const [name,setName]=useState("");
  const [image,setImage]=useState("");
 
  const helper = (data) => {
    localStorage.setItem('byValue', data);
    setByValue(data);
  };
  
  const naming = (data) => {
    localStorage.setItem('name', data);
    setName(data);
  };
  const imaging = (data) => {
    localStorage.setItem('image', data);
    setImage(data);
  };

  useEffect(() => {
    const storedByValue = localStorage.getItem('byValue');
    const storedName = localStorage.getItem('name');
    const storedImage=localStorage.getItem('image');
  
    if (storedByValue && storedName && storedImage) {
      setByValue(storedByValue);
      setName(storedName);
      setImage(storedImage);
    }
  }, []);

  const token = localStorage.getItem('token');
 
   
  
  return (
    <div className="App">
  
   
   
     
    <Router>
  {!token ? (<><Navbar2/>
  <Routes>
          <Route exact path='/Create' element={<Create toggleValue={toggleValue} helper={ helper} naming={naming} imaging={imaging}/>}/>
          <Route exact path='/Login' element={<Login   toggleValue={toggleValue} helper={ helper}  naming={naming} imaging={imaging}/>}/>
      
        </Routes>
        </>
  
  
  ):(<>
   
   
    <div className='name'><p>Welcome, {name}</p>Id:-{byValue}</div>
    
    {image &&   ( <div className="image-container">
                <img
                  className="user-image"
                  src={`data:image/jpeg;base64, ${image}`}
                  alt="User Image"
                />
              </div>)}
    
        <Navbar />
        <Routes>
          <Route exact path='/Send' element={<Send byValue={byValue} />}/>
          <Route exact path='/View' element={<View byValue={byValue}/>}/>
          <Route exact path='/Sent' element={<Sent byValue={byValue} />}/>
          <Route exact path='/Explore' element={<Explore byValue={byValue}/>}/>
          <Route exact path='/Requests' element={<Requests byValue={byValue}/>}/>
          <Route exact path='/Friends' element={<Friends byValue={byValue}/>}/>
          <Route exact path='/Logout' element={<Logout />}/>
        </Routes></>)}
     
      </Router>
      




    
   </div> 
  );
}

export default App;
