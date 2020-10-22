import React, { useContext } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { usersContext } from '../context/userContext'

function ContactComponent ({user}: {user:string}) {
    let userContext = useContext(usersContext)
    let currentUser = userContext?.chatUser || ""
    let setCurrentUser = () => userContext?.setChatUser(user)
    
    return (
        <Contact user={user} currentUser={currentUser} onClick={setCurrentUser} >
            <Icon>
                <FontAwesomeIcon icon={faUser} />
            </Icon>
            <Text>{user}</Text>
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
`
let Text = styled.div`
    flex: 1 0 0;
    margin-left: 30px;
`
