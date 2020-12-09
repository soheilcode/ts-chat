import React, { useContext, useState } from 'react'
import { sendMessage } from './socket'
import { AppContext } from './context'

function SendMessage() {
    const [message, setMessage] = useState<string>('')
    const { state } = useContext(AppContext);
    const handleSend = (e : React.FormEvent<HTMLFormElement> , username : string | null | undefined) => {
        e.preventDefault()
        if(username) {
            sendMessage({
                username : username , 
                message : message ,
                timestamp : new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
            })
            setMessage('')
        }
       
    }
    return (
      
                <div className="sendMessage">
                    <form className="message-form" onSubmit={(e) => handleSend(e , state.username)}>
                        <input type="text" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
                        <button type="submit" style={message ? {fontSize : '14px'} : {fontSize : '0px'}} disabled={!message}>Send</button>
                    </form>
                </div>
            )
        
            
     
    
}

export default SendMessage
