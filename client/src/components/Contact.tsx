import React, { useContext, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { usersContext } from '../context/userContext'

function ContactComponent ({user, notifications, setNotifications}: {user:string, notifications: string[], setNotifications: Dispatch<SetStateAction<string[]>>}) {
   let userContext = useContext(usersContext)
   let currentUser = userContext?.chatUser || ""
   let userName = user.split("..")[0]
   let hasNotification = notifications.some(notification => notification == userName)
   let setCurrentUser = () => {
      userContext?.setChatUser(user)
      let new_notifications = notifications.filter(notification => notification != userName)
      setNotifications(new_notifications)
   }
   
   return (
      <Contact
         user={user}
         currentUser={currentUser}
         onClick={setCurrentUser} >
         <Icon notification = {hasNotification}>
               <FontAwesomeIcon icon={faUser} />
         </Icon>
         <Text>{userName}</Text>
      </Contact>
   )
}

export { ContactComponent }

let Contact = styled.div`
   display: flex;
   align-items: center;
   height: 70px;
   padding: 10px;
   padding-left: 20px;
   cursor: pointer;
   background-color: ${({user, currentUser}: {user: string, currentUser: string}) => {
      if (user === currentUser)
         return 'rgb(174, 214, 241)'
      return  "rgba(0,0,0,0.05)";
   }};
   &:hover {
      background-color: ${({user, currentUser}: {user: string, currentUser: string}) => {
      if (user === currentUser)
         return 'rgb(174, 214, 241)'
      return "gainsboro"
   }};
   }
`
let Icon = styled.div`
   flex: 0 0 30px;
   font-size: 30px;
   color: ${({notification}: {notification: boolean}) => {
      if (notification)
         return 'rgb(41, 128, 185)'
      return 'black';
   }};

`
let Text = styled.div`
   flex: 1 0 0;
   margin-left: 30px;
`
