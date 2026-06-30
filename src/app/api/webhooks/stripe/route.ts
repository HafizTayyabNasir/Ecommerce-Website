import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/db";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2024-12-18.acacia", 
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_dummy";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Fulfill the order
        if (session.metadata?.orderId) {
          await prisma.order.update({
            where: { id: session.metadata.orderId },
            data: {
              paymentStatus: "PAID",
              paidAt: new Date(),
              stripePaymentId: session.payment_intent as string,
            },
          });
          
          // Here we would typically trigger an order confirmation email via Resend
          console.log(`Order ${session.metadata.orderId} marked as PAID`);
        }
        break;
        
      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        if (paymentIntent.metadata?.orderId) {
          await prisma.order.update({
            where: { id: paymentIntent.metadata.orderId },
            data: {
              paymentStatus: "FAILED",
            },
          });
        }
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Internal Server Error`, { status: 500 });
  }
}
