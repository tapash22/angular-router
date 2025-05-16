export interface User {
    id:number
    name:string
    email:string
    password: string
    role: 'admin' |'manager'|'officer'|'user'
    performance_rating?:number
}

export type LoginPayload  = Pick<User, 'email'| 'password'>

export type RegistrationPayload  = Pick<User, 'name'|'email'| 'password'>
export type WorkingResource  = Pick<User,'id' |'name'|'email' >


export interface Project{
    id:number
    project_title:string
    project_subtitle:string
    project_project_length: number
    project_estimated_date: string
    project_costing_needed:number
    project_resource_needed:number
    project_requirement:string[]
    working_resource: WorkingResource[]
    projectStatus?:'ready'|'start'|'on-process'|'stack'
}


