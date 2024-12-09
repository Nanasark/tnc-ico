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
  try {
    const {
      buyerWalletAddress,
      dollarAmount,
      email,
      receiveAmount,
      txnid,
      hash,
      status,
    } = await req.json();

    if (
      !buyerWalletAddress ||
      !dollarAmount ||
      !email ||
      !receiveAmount ||
      !txnid ||
      !hash ||
      !status
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify the hash here to ensure the request is coming from PayU

    await handleVerifyPayment(
      buyerWalletAddress,
      dollarAmount,
      email,
      receiveAmount,
      txnid,
      status
    );

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Error processing PayU webhook payload:", error);
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }
}

// Function to handle payment verification
const handleVerifyPayment = async (
  buyerWalletAddress: string,
  dollarAmount: number,
  email: string,
  receiveAmount: number,
  txnid: string,
  status: string
) => {
  try {
    const response = await payuClient.verifyPayment(txnid);
    console.log("PayU verification response:", response);

    if (
      response.status === "success" ||
      response.status === 1 ||
      status === "success"
    ) {
      await handlePaymentSuccess(
        email.split("@")[0], // firstname
        email,
        dollarAmount,
        receiveAmount,
        "Purchase", // productinfo
        buyerWalletAddress
      );
    } else {
      throw new Error(`Payment verification failed: ${response.msg}`);
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

// Handle payment success
const handlePaymentSuccess = async (
  firstname: string,
  email: string,
  dollarAmount: number,
  receiveAmount: number,
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
      body: `Email=${email}&Wallet=${buyerWalletAddress}&Receive=${receiveAmount}&Paid=${dollarAmount}`,
    });

    if (!tx.ok) {
      throw new Error("Failed to log payment success");
    }
  } catch (error) {
    console.error("Error handling payment success:", error);
    throw error;
  }
};
