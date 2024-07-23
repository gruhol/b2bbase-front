export interface PriceList {
    id: number, 
    productName: string,
    promotionPrice: boolean,
    price: number,
    startDate: Date, 
    endDate: Date,
    isActive: boolean
}