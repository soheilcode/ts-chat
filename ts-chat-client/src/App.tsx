import React, { useContext, useState } from 'react';
import './App.css';
import Chat from './Chat';
import { connectSocket } from './socket';
import { MESSAGE } from './interfaces';
import { AppContext } from './context';
import axios from 'axios'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, TextField, Tooltip } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function App() {
  const [username, setUsername] = useState<string | null >(null)
  const [typed, setTyped] = useState<string>('')
  const [messages , setMessages] = useState<MESSAGE[]>([])
  const [users, setUsers] = useState<string[]>([])
  const { dispatch } = useContext(AppContext);
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    setTyped(e.target.value)
  }

  const handleJoin = () => {
    if(typed && typed !== 'admin' /* :) */ ) {
      setUsername(typed)
      dispatch({type : 'SET_USER' , username : typed})

      connectSocket(
          //1st cb listens for new messages and updates messages
          function <T>(err : T , data : MESSAGE) : void {
          setMessages(messages => [...messages , data])
      },
          //2nd cb handles new user connection (warns as admin and changes online list)
          function <T>(err : T , data : string) : void {
          setUsers(users => [...users , data])
          setMessages(messages => [...messages , {message : `${data} just joined , Say Hi!` , timestamp : new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}) , username : 'admin'}])
      },  
          //3rd cb handles user disconnect (warns as admin and changes online list)
          function <T>(err : T , data : string) : void {
          setUsers(users => {
            const newUsers = [...users]
            newUsers.splice(newUsers.indexOf(data) , 1)
            return newUsers
          })
          setMessages(messages => [...messages , {message : `${data} left the chat!` , timestamp : new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}) , username : 'admin'}])
      },
          //4th param is the chosen username
          typed)
      
      
      //get online list when connection happens
      axios.get('http://localhost:8080/api/onlineUsers').then(res => setUsers(res.data))
    }

    
  }
  return (
    
       <div className="App">
      {
        username ? 

        <div className="body">
          <Tooltip title={
        <div>
          {
            users.map(user => (
              <div className="online_user">
                  <FiberManualRecordIcon />
                  <h4>{user}</h4>
              </div>
            
            ))
          }
        </div>}>
          <div className="header">
            <h3 className="online">Online Users<ExpandMoreIcon/></h3>

          </div>

        </Tooltip>
          <Chat username={username} messages={messages}/>
        </div>
       

         :
      <div className="start_page">
        <h2 style={{fontWeight : 300}}>Please Enter Your Name</h2>
        <div>

          <TextField type="text" value={typed} onChange={handleChange} variant="filled" placeholder="Username..."/>
          <Button onClick={handleJoin}>Start Chat!</Button>
        </div>
      </div>
      }  
    </div>
    
   
  );
}

export default App;
