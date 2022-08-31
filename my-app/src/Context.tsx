import { createContext, Dispatch, SetStateAction } from "react"
import { RespSign } from "./functionality/api"

type AppContextType = {
	isAvtorization: boolean
	setIsAvtorization: Dispatch<SetStateAction<boolean>>
}



type UserContextType = {
	user: RespSign | null
	setUser: Dispatch<SetStateAction<null>>
}

export const Context = createContext<AppContextType | null>(null)
export const ContextUser = createContext<UserContextType | null>(null)


