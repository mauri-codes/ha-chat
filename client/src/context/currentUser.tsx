import { createContext } from 'react';

export interface UserState {
    user: string
    setUser: (value: string) => void
}
let currentUser = createContext<UserState | null>(null)

export { currentUser }