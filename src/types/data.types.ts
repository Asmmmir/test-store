import type { Nullable } from "@/types/common"

interface IGoods {
    B: boolean
    C: number
    CV: Nullable<unknown>
    G: number
    P: number
    Pl: Nullable<unknown>
    T: number
}


 export interface IData {
    Error: string
     Id: number
     Success: boolean
     Value: {
        Goods: IGoods[]
     }
}


export interface ICachePrice {
    id: number
    price: number
}