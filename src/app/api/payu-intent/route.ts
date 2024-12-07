import { NextResponse } from "next/server";
import crypto from "crypto";

const { PAYU_MERCHANT_KEY, PAYU_MERCHANT_SALT } = process.env;

export async function POST(req: Request) {
  try {
    const { buyerWalletAddress, dollarAmount, email, receiveAmount } =
      await req.json();

    if (!buyerWalletAddress || !dollarAmount || !email || !receiveAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a unique transaction ID
    const transactionId = `txn_${Date.now()}`;
    const amount = dollarAmount.toFixed(2);
    const productInfo = "Crypto Purchase";

    // Prepare the hash string for PayU
    const hashString = `${PAYU_MERCHANT_KEY}|${transactionId}|${amount}|${productInfo}|${
      email.split("@")[0]
    }|${email}|||||||||||${PAYU_MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    // Construct the PayU payload
    const payuPayload = {
      key: PAYU_MERCHANT_KEY,
      txnid: transactionId,
      amount,
      productinfo: productInfo,
      firstname: email.split("@")[0],
      email,
      surl: "https://tnc-ico.vercel.app/success", // Replace with your success URL
      furl: "https://your-domain.com/payu-failure", // Replace with your failure URL
      hash,
    };

    // Return the payload as a response (for frontend to redirect)
    return NextResponse.json({ payuPayload, transactionId });
  } catch (error) {
    console.error("Error in PayU intent API:", error);
    return NextResponse.json(
      { error: "Failed to process PayU transaction" },
      { status: 500 }
    );
  }
}

