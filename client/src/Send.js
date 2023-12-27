import {useState,useEffect} from 'react'
const api_base="http://localhost:3001"
function Send({byValue}) {
    const [namee,setNamee]=useState("");

	
    const [messagee,setMessagee]=useState("");
    const addMsg = async () => {
		const data = await fetch(api_base + "/msg/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
        name:namee,
		by:byValue,
				message: messagee
			})
		}).then(res => res.json());
		setNamee("");
		setMessagee("");

	}
return(

        <div className="popup">
    <input type="text" className="add-todo-input" placeholder="Id" onChange={e => setNamee(e.target.value)} value={namee} />
    <input type="text" className="add-todo-input" placeholder="Message" onChange={e => setMessagee(e.target.value)} value={messagee} />
						<div className="button" onClick={addMsg}>Message</div>
						

   </div>
  
    );
}

export default Send;