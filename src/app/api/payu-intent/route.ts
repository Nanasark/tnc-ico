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

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://tnc-ico.vercel.app"
        : "http://localhost:3000";

    // Construct the success URL with query parameters
    const successUrl = new URL("/success", baseUrl);
    successUrl.searchParams.append("txnid", transactionId);
    successUrl.searchParams.append("amount", amount);
    successUrl.searchParams.append("status", "success");
    successUrl.searchParams.append("hash", hash);
    successUrl.searchParams.append("email", email);
    successUrl.searchParams.append(
      "address1",
      encodeURIComponent(buyerWalletAddress)
    );
    successUrl.searchParams.append(
      "address2",
      encodeURIComponent(receiveAmount.toString())
    );

    // Construct the PayU payload
    const payuPayload = {
      key: PAYU_MERCHANT_KEY,
      txnid: transactionId,
      amount,
      productinfo: productInfo,
      firstname: email.split("@")[0],
      email,
      surl: successUrl.toString(),
      furl: `${baseUrl}/payu-failure`,
      hash,
      address1: buyerWalletAddress,
      address2: receiveAmount.toString(),
    };
    console.log("Base URL:", baseUrl);
    console.log("Success URL:", successUrl.toString());
    console.log("PayU Payload:", payuPayload);

    // Return the payload for frontend redirection
    return NextResponse.json({ payuPayload, transactionId });
  } catch (error) {
    console.error("Error in PayU intent API:", error);
    return NextResponse.json(
      { error: "Failed to process PayU transaction" },
      { status: 500 }
    );
  }
}
