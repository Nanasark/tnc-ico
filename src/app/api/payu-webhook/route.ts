import { NextRequest, NextResponse } from "next/server";
const PayU = require("payu-websdk");

const payuClient = new PayU(
  {
    key: process.env.PAYU_MERCHANT_KEY,
    salt: process.env.PAYU_MERCHANT_SALT,
  },
  "TEST"
); // Change to "LIVE" when going live

const { SHEETURL } = process.env;

export async function POST(req: NextRequest) {
  const body = await req.text();
  let event;

  try {
    event = JSON.parse(body);
    console.log("Received event:", event); // Debugging log
  } catch (error) {
    console.error("Error parsing PayU webhook payload:", error);
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }

  if (!event || !event.type) {
    return NextResponse.json({ error: "Missing event type" }, { status: 400 });
  }

  if (event.type === "verify_payment") {
    await handleVerifyPayment(event.data.txnid);
  }

  return NextResponse.json({ message: "success" });
}

// Function to handle payment verification
const handleVerifyPayment = async (txnid: string) => {
  try {
    const response = await payuClient.verifyPayment(txnid);

    if (response.status === 1) {
      const { firstname, email, amt, productinfo, buyerWalletAddress } =
        response.transaction_details;
      await handlePaymentSuccess(
        firstname,
        email,
        amt,
        productinfo,
        buyerWalletAddress
      );
    } else {
      throw new Error(`Payment verification failed: ${response.msg}`);
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
  }
};

// Handle payment success
const handlePaymentSuccess = async (
  firstname: string,
  email: string,
  amt: number,
  productinfo: string,
  buyerWalletAddress: string
) => {
  if (!buyerWalletAddress || !email) {
    throw new Error("Email and wallet address missing");
  }

  try {
    const url = `${SHEETURL}`;
    const tx = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `Email=${email}&Wallet=${buyerWalletAddress}&Paid=${amt}&ProductInfo=${productinfo}&Firstname=${firstname}`,
    });

    if (!tx.ok) {
      throw new Error("Failed to log payment success");
    }
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
};
