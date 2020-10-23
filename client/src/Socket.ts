import io from 'socket.io-client'

interface IncommingMessage {
   from: {username: string}
   message: string
}
interface receiveMessageProps {
   pushMessage: (user: string, text: string, sender: string) => void
   addNotification: (user: string) => void
}

class Socket {
    socket = io("http://localhost")
    constructor(user:string, setUserList:(list: any)=>void) {
      this.onConnect(user, setUserList)
      this.onDisconnect()
   }
   onConnect (user:string, setUserList:(list: any)=>void) {
      this.socket.on('connect', () => {
         this.socket.emit("register", user)
         this.socket.on("all_users", ({users}: {users:string[]}) => {
            let contactList = users
               .map(userKey => {
                  let [name, id] = userKey.split('..')
                  return {name, id}
               })
               .filter(userObject => userObject.name !== user)
            setUserList(contactList)
         })
      })
   }

   receiveMessage({pushMessage, addNotification}: receiveMessageProps ) {
      this.socket.on("message", (data: IncommingMessage) => {
         let user = data.from.username
         pushMessage(user, data.message, user)
         addNotification(user)
      })
   }
   emitMessage(recipient: string, message: string) {
      this.socket.emit("message", { recipient, message })
   }
   onDisconnect () {
      this.socket.on('disconnect', () => {
         console.log(this.socket.connected)
      })
   }
   disconnect() {
      this.socket.disconnect()
   }
}

export { Socket }
