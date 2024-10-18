export type CreatePaymentIntentParams = {
    amount:number;
    orderId:number;
}

export type UpdatePaymentIntentParams = {
    paymentIntentId:string;
    amount:number;
    orderId?:number;
}