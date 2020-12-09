import io from 'socket.io-client'
import { MESSAGE } from './interfaces';

type eventCB = (err : unknown , data : string ) => void
type MsgCb = (err : unknown , data : MESSAGE) => void

let socket : SocketIOClient.Socket

export const connectSocket = (receiveMessage : MsgCb , joinUser : eventCB , leaveUser : eventCB ,username : string) => {
    socket = io('localhost:8080');
    socket.emit('join' , username)
    socket.on('join' , (username : string) => {
        console.log('joined')
        return joinUser(null , username)
    })
    socket.on('dc' , (username : string) => {
        return leaveUser(null , username)
    })
    socket.on('chat' , (message : MESSAGE) => {
        console.log(message)
        return receiveMessage(null , message)
    })
    
}
export const sendMessage = (message : MESSAGE) => {
    if(socket) {
        socket.emit('chat' , message)
    }
}