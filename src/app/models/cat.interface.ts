import { IBreed } from "./breed.interface";

export interface ICat{
    id: string,
    url: string,
    height: number,
    width: number,
    breeds: [IBreed]
}