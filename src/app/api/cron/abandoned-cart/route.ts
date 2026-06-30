import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
// import { sendEmail } from "@/lib/email"; // To be implemented

export async function GET(req: Request) {
  try {
    // Basic authorization for cron job (e.g. Vercel Cron Secret)
    const authHeader = req.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find abandoned carts that haven't been recovered, haven't been emailed yet,
    // and were created more than 4 hours ago but less than 24 hours ago.
    const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const abandonedCarts = await prisma.abandonedCart.findMany({
      where: {
        recovered: false,
        emailSent: false,
        createdAt: {
          lte: fourHoursAgo,
          gte: twentyFourHoursAgo,
        },
      },
      take: 50, // Batch limit
    });

    console.log(`Found ${abandonedCarts.length} abandoned carts to process.`);

    for (const cart of abandonedCarts) {
      // In a real application, send the email here:
      // await sendEmail({
      //   to: cart.email,
      //   subject: "You left something behind...",
      //   template: "abandoned-cart",
      //   data: { cart: cart.cartData }
      // });

      // Mark as emailed
      await prisma.abandonedCart.update({
        where: { id: cart.id },
        data: {
          emailSent: true,
          emailSentAt: new Date(),
        },
      });
      
      console.log(`Processed abandoned cart for ${cart.email}`);
    }

    return NextResponse.json({ 
      success: true, 
      processed: abandonedCarts.length 
    });
  } catch (error: any) {
    console.error("Cron Error (Abandoned Cart):", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
