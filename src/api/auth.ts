import type { AuthRespose } from "../types/auth"
import API from "./client"

type RegisterData = {
    name: string,
    email: string,
    password: string
}

export const RegisterUser = (data: RegisterData) => {
    return API.post<AuthRespose>('/auth/register', data)
}