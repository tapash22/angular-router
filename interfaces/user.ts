export interface User {
    id:number
    name:string
    email:string
    password: string
    role: 'admin' |'manager'|'officer'|'user'
}

export type LoginPayload  = Pick<User, 'email'| 'password'>

export type RegistrationPayload  = Pick<User, 'name'|'email'| 'password'>


