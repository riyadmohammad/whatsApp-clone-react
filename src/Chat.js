import React, {useEffect , useState} from 'react'
import './Chat.css';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";

//iucons
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import { useParams } from 'react-router-dom';

function Chat() {

    const [input,setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName,setRoomName]=useState("");
    const [messages ,setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

   


    useEffect(()=>{
       
          if(roomId){
              db.collection("rooms").doc(roomId).onSnapshot(snapshot=>{
                  setRoomName(snapshot.data().name)
              })


              db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp" , "asc").onSnapshot(snapshot => 
               
                setMessages(snapshot.docs.map(doc => doc.data()))
                )
  
             

             
          }
  
      },[roomId])

    useEffect(() => {

        setSeed(Math.floor(Math.random()*5000 ));
    },[]);

    const sendMessage = (e) => {

        e.preventDefault();

        db.collection("rooms").doc(roomId).collection("messages").add({

            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        });

        setInput("");


    }

    

    return (
        <div className="chat">

            <div className="chat__header">
                 <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                 <div className="chat__headerInfo">

                     <h3>{roomName}</h3>

    <p>Last seen{" "}{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>

                 </div>
                 <div className="chat__headerRight">
                     <IconButton>
                         <SearchOutlinedIcon/>
                     </IconButton>
                     <IconButton>
                         <AttachFileOutlinedIcon />
                     </IconButton> 
                     <IconButton>
                         <MoreVertIcon />
                    </IconButton> 
                 </div>

                 
            </div>

            <div className="chat__body">
                {messages.map(message =>(
                    <p className={`chat__message ${message.name ===user.displayName && "chat__reciver"}`}>
    
                <span className="chat__name">{message.name}</span>
    
                         {message.message}
    
                        <span className="chat__timestamp"> {new Date(message.timestamp?.toDate()).toLocaleTimeString()}</span>
                        
                        </p>

                ))}
                
            </div>

            <div className="chat__footer">
                <InsertEmoticonOutlinedIcon />

                <form >
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Send a message"/>
                    <button onClick={sendMessage} >Send</button>

                </form>

                <MicOutlinedIcon />
            </div>

        </div>
    );
}



export default Chat
