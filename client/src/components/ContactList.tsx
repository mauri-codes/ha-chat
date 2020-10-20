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
    let ContactList = styled.div`
       display: flex;
       flex-direction: column;
       flex: 1 0 200px;
    `
    return (
        <ContactList>
            {contact_info && contact_info.map((contact) => (<ContactComponent user={contact} />))}
        </ContactList>
    )
}

export { ContactListComponent }
