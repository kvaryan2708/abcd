import {useState,useEffect} from 'react'

function Logout () {
   
    localStorage.removeItem('token');
    window.location.reload();
  };

 export default Logout; 