export interface IProduct {
    id: number
    group: string
    name: string
    price: number
    quantity: number
}

export interface ICartItem {
    group: string
    id:number
    name: string
    price: number
    quantity: number
    limit: number
}

export type Categories = Record<string, IProduct[]>