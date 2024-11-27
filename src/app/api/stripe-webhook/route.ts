import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
<<<<<<< HEAD
=======
import { chainId } from "@/app/chain";
import { toWei } from "thirdweb";
import { revalidatePath } from "next/cache";
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

<<<<<<< HEAD
const { WEBHOOK_SECRET_KEY, SHEETURL } = process.env;
=======
const {
  WEBHOOK_SECRET_KEY,
  ENGINE_URL,
  ENGINE_ACCESS_TOKEN,
  NEXT_PUBLIC_ICO_CONTRACT,
  BACKEND_WALLET_ADDRESS,
} = process.env;
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73

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
<<<<<<< HEAD
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
=======
  if (
    !ENGINE_URL ||
    !ENGINE_ACCESS_TOKEN ||
    !NEXT_PUBLIC_ICO_CONTRACT ||
    !BACKEND_WALLET_ADDRESS
  ) {
    throw "server misconfigured check your env file";
  }
  const { buyerWalletAddress, dollarAmount } = charge.metadata;

  if (!buyerWalletAddress) {
    throw "no user connected, Sign In";
  }

  const pricePerToken = 0.01;
  const amount = Math.floor(parseFloat(dollarAmount) / pricePerToken);
  const sendingAmount = toWei(`${amount}`);

  console.log(amount);
  try {
    const tx = await fetch(
      `${ENGINE_URL}/contract/${chainId}/${NEXT_PUBLIC_ICO_CONTRACT}/write`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ENGINE_ACCESS_TOKEN}`,
          "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
        },
        body: JSON.stringify({
          functionName: "send",
          args: [`${buyerWalletAddress}`, sendingAmount.toString()],
        }),
      }
    );

    console.log("contract:", NEXT_PUBLIC_ICO_CONTRACT);
    if (!tx.ok) {
      throw "purchase failed";
    }
    revalidatePath("/");
    if (tx.ok) {
    
      window.location.reload();
    }
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
  } catch (error) {
    console.log(error);
  }
};
