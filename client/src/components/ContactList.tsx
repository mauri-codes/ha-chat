import React, { useContext, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components'
import { ContactComponent } from './Contact'
import { usersContext } from '../context/userContext'

interface ContactListProps {
   notifications: string[],
   setNotifications: Dispatch<SetStateAction<string[]>>
}
function ContactListComponent({notifications, setNotifications}: ContactListProps) {
   let userContext = useContext(usersContext)
   return (
      <ContactList>
         {(userContext?.userList || []).map(
            (contact) => (
               <ContactComponent
                  setNotifications = {setNotifications}
                  key={`${contact.id}`}
                  user={`${contact.name}..${contact.id}`}
                  notifications = {notifications}
                  />
            )
         )}
      </ContactList>
   )
}

export { ContactListComponent }

let ContactList = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1 0 200px;
`
