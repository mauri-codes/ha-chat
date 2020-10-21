import React from 'react';
import styled from 'styled-components'
import { ContactComponent } from './Contact'

function ContactListComponent() {
    let contact_info = [
        "Rebecca",
        "Tito",
        "Erick", 
        "Ammanda"
    ]
    return (
        <ContactList>
            {contact_info && contact_info.map((contact) => (<ContactComponent key={contact} user={contact} />))}
        </ContactList>
    )
}

export { ContactListComponent }

let ContactList = styled.div`
display: flex;
flex-direction: column;
flex: 1 0 200px;
`
