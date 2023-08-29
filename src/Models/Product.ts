import { IUser } from "./User";

export interface IProduct {
    id:string;
    name:string
    price:number;
    url:string;
    users: Array<IUser>
}