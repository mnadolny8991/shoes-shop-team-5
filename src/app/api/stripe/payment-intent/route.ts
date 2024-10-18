import { authOptions } from '@/lib/auth';
import { CreatePaymentIntentParams, UpdatePaymentIntentParams } from '@/types/paymentIntent';
import { AuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(authOptions as AuthOptions);
  // if (!session)
  //   return Response.json({ error: { status: 403, message: 'Forbidden'} }, { status: 403 });
 
  try {
    const { amount, orderId }: CreatePaymentIntentParams = await req.json();
    const metadata : Stripe.MetadataParam = {orderId}
    if(session)
      metadata.userId = session.id
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      metadata
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      orderId: paymentIntent.metadata.orderId,
      amount: paymentIntent.amount
    });
  } catch (error) {
    console.warn(error);
    return Response.json(
      { error: { status: 500, message: 'Internal server error' }},
      { status: 500 }
    );
  }
};

export const PATCH = async (req: Request) => {
  try {
    const { amount, orderId, paymentIntentId }: UpdatePaymentIntentParams = await req.json();
    const updatingData : Stripe.PaymentIntentUpdateParams = {amount}
    if(orderId)
      updatingData.metadata = {orderId};
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, updatingData);

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      orderId: paymentIntent.metadata.orderId,
      amount: paymentIntent.amount
    });
  } catch (error) {
    console.warn(error);
    return Response.json(
      { error: { status: 500, message: 'Internal server error' }},
      { status: 500 }
    );
  }
}
