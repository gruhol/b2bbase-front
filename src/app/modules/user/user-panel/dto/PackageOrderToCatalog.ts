export interface PackageOrderToCatalog {
    id: number,
    packageType: string,
    startDate: Date,
    endDate: Date,
    price: number,
    paymentType: string,
    paymentStatus: string;
}