export interface User{
    _id: string,
    name: string,
    email: string,
    role: "user" | "admin"
}

export interface AuthRespose{
    success: boolean,
    message: string,
    token: string,
    user: User
}