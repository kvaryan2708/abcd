import React from 'react'
// import Send from "./Send"
// import View from "./View"

import { Link } from 'react-router-dom';
function Navbar2(){
    return(
        <>
        <Link to="/Create" className='button'>Create Account</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Login" className='button'>Log In</Link>&nbsp;&nbsp;&nbsp;
      
        </>
    );
}

export default Navbar2;