import { createContext, Dispatch, SetStateAction } from 'react';

export interface User {
   name: string
   id: string
 }

export interface UserState {
   user: string
   setUser: (value: string) => void
   userList: User[]
   chatUser: string
   setChatUser: (value: string) => void
}

let usersContext = createContext<UserState | null>(null)

export { usersContext }