<<<<<<< HEAD
=======
import { metadata } from "@/app/layout";
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
import { NextResponse } from "next/server";
import { Stripe } from "stripe";
const { STRIPE_SECRET_KEY } = process.env;

export async function POST(req: Request) {
  if (!STRIPE_SECRET_KEY) {
    throw "Stripe secret key not found";
  }
<<<<<<< HEAD
  const { buyerWalletAddress, dollarAmount, email, receiveAmount } =
    await req.json();
=======
  const { buyerWalletAddress, dollarAmount } = await req.json();
  //   const { amount } = await req.json();

>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
  if (!buyerWalletAddress) {
    throw " buyer wallet address not found";
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-11-20.acacia",
  });

<<<<<<< HEAD
=======


>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
  const amountInCents = dollarAmount * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    description: " buying crypto with credit card",
    payment_method_types: ["card"],
<<<<<<< HEAD
    metadata: { buyerWalletAddress, dollarAmount, email, receiveAmount },
=======
    metadata: { buyerWalletAddress, dollarAmount },
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
