import { Role } from "../models/User";

export interface User {
    _id: string;
    name:string;
    email:string;
    role:Role;
    password:string
}