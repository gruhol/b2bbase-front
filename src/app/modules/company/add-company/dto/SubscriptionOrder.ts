export interface SubscriptionOrder {
    id: number,
    companyId: number,
    subscriptionType: string,
    startDate: Date,
    endDate: Date,
    paymentType: string,
    paymentStatus: string
}