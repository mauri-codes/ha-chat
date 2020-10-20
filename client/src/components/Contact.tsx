import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function ContactComponent ({user}: {user:string}) {

    let Contact = styled.div`
        display: flex;
        align-items: center;
        width: 100%;
        height: 70px;
        padding: 10px;
        padding-left: 20px;
    `
    let Icon = styled.div`
        flex: 0 0 30px;
        font-size: 30px;
    `
    let Text = styled.div`
        flex: 1 0 0;
        margin-left: 30px;
    `
    return (
        <Contact>
            <Icon>
                <FontAwesomeIcon icon={faUser} />
            </Icon>
            <Text>{user}</Text>
        </Contact>
    )
}

export { ContactComponent }
