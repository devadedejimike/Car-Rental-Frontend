import type { AuthRespose } from "../types/auth"
import API from "./client"

type RegisterData = {
    username: string,
    email: string,
    password: string
}

type LoginData = {
    email: string,
    password: string
}

export const RegisterUser = (data: RegisterData) => {
    return API.post<AuthRespose>('/auth/register', data)
}

export const LoginUser = (data: LoginData) =>{
    return API.post<AuthRespose>('/auth/login', data)
}