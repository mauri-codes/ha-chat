import React, { useContext } from 'react';
import styled from 'styled-components'
import { ContactComponent } from './Contact'
import { usersContext } from '../context/userContext'

function ContactListComponent() {
   let contact_info = [
      "Rebecca",
      "Tito",
      "Erick", 
      "Ammanda"
   ]
   let userContext = useContext(usersContext)
   return (
      <ContactList>
         {contact_info && (userContext?.userList || []).map((contact) => (<ContactComponent key={contact.name} user={contact.name} />))}
      </ContactList>
   )
}

export { ContactListComponent }

let ContactList = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1 0 200px;
`
