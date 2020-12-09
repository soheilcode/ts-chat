import React, { useEffect, useRef } from 'react'
import { MESSAGE } from './interfaces'
import Message from './Message'
import SendMessage from './SendMessage'


const Chat: React.FC<{username : string , messages : MESSAGE[] }> = ({username , messages}) => {
    const chatRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if(chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    } , [messages])

    return (
    <div className='chat'>
     
        <div className="messages" ref={chatRef}>
            {
                messages.map((message , index) => (
                    <Message message={message} key={index} username={username}/>
                ))
            }
        </div>
        <SendMessage />
    </div>
    
    )
}

export default Chat
