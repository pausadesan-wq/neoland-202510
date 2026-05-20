import { createContext, useContext as useContextFromReact } from 'react'

export const Context = createContext()

export const useContext = () => useContextFromReact(Context)