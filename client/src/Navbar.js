import React from 'react'
// import Send from "./Send"
// import View from "./View"

import { Link } from 'react-router-dom';
function Navbar(){
    return(
        <>
        <Link to="/Send" className='button'>Send Message</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/View" className='button'>View Message</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Sent" className='button'>Sent Msgs</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Explore" className='button'>Explore</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Requests" className='button'>Requests</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Friends" className='button'>Friends</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Logout" className='button'>Log Out</Link>&nbsp;&nbsp;&nbsp;
        </>
    );
}

export default Navbar;