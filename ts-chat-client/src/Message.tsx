import React from 'react'
import { MESSAGE } from './interfaces'

interface Props {
    username : string
    message : MESSAGE 
}

const Message : React.FC<Props> = ({message , username}) => {
    const self = message.username === username
    const admin = message.username === 'admin'
    return (
        <div className={admin ? 'admin-msg' : self ? 'msg msg-self' : 'msg'}>

            {
                (!self && !admin) && <h4>{message.username}</h4>
            }
        
            <div>
                <p>{message.message}</p>
                <span>{message.timestamp}</span>
            </div>
        </div>
    )
}

export default Message
