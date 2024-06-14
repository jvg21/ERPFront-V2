export type SalesModel = {
    idSale:number|undefined
    fk_IdClient: number|null,
    fk_IdSeller: number|null,
    fk_IdCar: number|null,
    dthRegister: string,
    price: number
} 