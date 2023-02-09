import io from 'socket.io-client'
import {getCookieMsgToken} from "@/util/auth"
const {VITE_MESSAGE_CENTER} = process.env

const socket = io(VITE_MESSAGE_CENTER, {
  query: {
    token: "Bearer " + getCookieMsgToken()
  },
  transports: ['websocket', 'polling'],
  timeout: 5000,
  autoConnect: false, // 避免挂载时候就尝试连接
})

socket.reconnect = function(){
  socket.query.token = "Bearer " + getCookieMsgToken()
  socket.connect()
}

export default socket

