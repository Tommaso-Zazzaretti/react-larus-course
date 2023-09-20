import { Context, createContext } from "react";

export interface LoginProviderData {
    isLogged: boolean,
    setIsLogged: (logged: boolean) => void
}

const initState:LoginProviderData = {
    isLogged:false,
    setIsLogged:(logged:boolean)=>{}
}

export const LoginContext:Context<LoginProviderData> = createContext<LoginProviderData>(initState);