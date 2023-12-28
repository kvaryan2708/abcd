import {useState,useEffect} from 'react'
const api_base="http://localhost:3001"
function Friends({ byValue }) {
  const [msgArr, setMsgArr] = useState([]);
  const [re, setRe] = useState("");
  const [messagee, setMessagee] = useState("");
  const [popup, setPopup] = useState(false);
  const [loading,setLoading]=useState(true);


  useEffect(() => {
    setLoading(true);
    GetMsg();
    
  }, [byValue]);

  const GetMsg = async () => {
    try {
      const response = await fetch(`${api_base}/friends/${byValue}`);
      const data = await response.json();
      setMsgArr(data);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false); // Move setLoading(false) to finally block
    }
  };

  const addMsg = async () => {
    const data = await fetch(api_base + "/msg/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: re,
        by: byValue,
        message: messagee,
      }),
    }).then((res) => res.json());
    
    setMessagee("");
    setPopup(false);
  };

  const helper = (msg) => {
    setPopup(true);
    setRe(msg);
  };

  const bad = () => {
    setPopup(false);
  };
  const [images, setImages] = useState({});
  useEffect(() => {
    const getImage = async (d) => {
      try {
        const response = await fetch(`${api_base}/getImage/${d}`);
        const data = await response.json();

        setImages((prevImages) => ({
          ...prevImages,
          [d]: data,
        }));
      } catch (error) {
        console.error("Error: ", error);
      }
    };


    msgArr.forEach((msg) => {
      getImage(msg);
    });
  }, [msgArr]);
    return(
     <div className="todos">
     {loading ? (''):
    msgArr.length > 0 ? (
        msgArr.map(msg => (
        <div className="todo " >
         
          <div className="text">{images[msg] &&   ( <div className="image-containernew">
                <img
                  className="user-imagenew"
                  src={`data:image/jpeg;base64, ${images[msg]}`}
                  alt="User Image"
                />
              </div>)}{msg}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="button" onClick={()=> helper(msg)}>Message</div>
          </div>
          
          {popup ? ( <div className="popup">

    <input type="text" className="add-todo-input" placeholder="Message" onChange={e => setMessagee(e.target.value)} value={messagee} />
						<div className="button" onClick={()=>addMsg()}>Send</div>
            <div className="closePopup" onClick={() => setPopup(false)}>X</div>

   </div>

          ):('')}
     
        </div>
        
       ))):(
        <h1 className="emp">Make Friends</h1>
       )}
       
       </div>
    );
}

export default Friends;