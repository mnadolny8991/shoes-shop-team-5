import fetchData from "@/lib/api/fetchData"
import { CreatePaymentIntentParams, UpdatePaymentIntentParams } from "@/types/paymentIntent"

const apiUrl = '/api/stripe/payment-intent'

export const createPaymentIntent = async (params: CreatePaymentIntentParams) => 
    await fetchData(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
})

export const updatePaymentIntent = async (params: UpdatePaymentIntentParams) =>
    await fetchData(apiUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
})
