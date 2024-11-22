import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

const { WEBHOOK_SECRET_KEY, SHEETURL } = process.env;

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET_KEY) {
    throw 'Did you forget to add ".env.local" file';
  }

  const body = await req.text();

  const sig = headers().get("stripe-signature") as string;

  if (!sig) {
    throw "No Signature provided";
  }

  const event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET_KEY);
  switch (event.type) {
    case "charge.succeeded":
      await handleChargeSucceeded(event.data.object as Stripe.Charge);
      break;
  }

  return NextResponse.json({ message: "success" });
}

const handleChargeSucceeded = async (charge: Stripe.Charge) => {
  const { buyerWalletAddress, dollarAmount, email, receiveAmount } =
    charge.metadata;

  if (!buyerWalletAddress || !email) {
    throw "Email and address missing";
  }

  try {
    const url = `${SHEETURL}`;
    const tx = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `Email=${email}&Wallet=${buyerWalletAddress}&Receive=${receiveAmount}&Paid=${dollarAmount}`,
    });

    if (!tx.ok) {
      throw "purchase failed";
    }
  } catch (error) {
    console.log(error);
  }
};
