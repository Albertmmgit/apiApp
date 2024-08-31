import { Iuser } from "./iuser.interface";

export interface IusersList {
    page: number
    per_page: number
    total: number
    total_pages: number
    results: Iuser[]
}
