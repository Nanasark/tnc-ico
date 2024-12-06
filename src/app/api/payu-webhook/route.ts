import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const PayU = require("payu-websdk");

// Initialize PayU client
const payuClient = new PayU(
  {
    key: process.env.PAYU_MERCHANT_KEY,
    salt: process.env.PAYU_MERCHANT_SALT,
  },
  "TEST" // Change to "LIVE" when going live
);

const { SHEETURL } = process.env;

export async function POST(req: NextRequest) {
  const body = await req.text();

  let event;
  try {
    // Parse the incoming webhook payload
    event = JSON.parse(body);
  } catch (error) {
    console.error("Error parsing PayU webhook payload:", error);
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }

  // Handle event types
  switch (event.type) {
    case "payment_initiate":
      await handlePaymentInitiate(event.data);
      break;

    case "verify_payment":
      await handleVerifyPayment(event.data.txnid);
      break;

    default:
      console.error(`Unhandled event type: ${event.type}`);
      return NextResponse.json({ error: `Unhandled event type: ${event.type}` }, { status: 400 });
  }

  return NextResponse.json({ message: "success" });
}

// Function to handle payment initiation
const handlePaymentInitiate = async (data: any) => {
  const { txnid, amount, firstname, email, productinfo } = data;

  if (!txnid || !amount || !firstname || !email || !productinfo) {
    throw new Error("Missing required fields in payment initiation data");
  }

  const hash = generateHash(
    { txnid, amount, productinfo, firstname, email },
    process.env.PAYU_SALT
  );

  const transactionDetails = {
    key: process.env.PAYU_KEY,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    surl: "https://tnc-ico.vercel.app/success", // Success URL
    furl: "https://yourdomain.com/failure", // Failure URL
    hash,
  };

  try {
    const response = await payuClient.paymentInitiate(transactionDetails);
    // Handle response and send the form HTML
    return { html: response };
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Payment initiation failed");
  }
};

// Function to handle payment verification
const handleVerifyPayment = async (txnid: string) => {
  try {
    const response = await payuClient.verifyPayment(txnid);

    if (response.status === 1) {
      // Payment successful, record the payment success
      await handlePaymentSuccess(response.transaction_details);
    } else {
      throw new Error(`Payment verification failed: ${response.msg}`);
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw new Error("Payment verification failed");
  }
};

// Handle payment success (you can customize this further)
const handlePaymentSuccess = async (transactionDetails: any) => {
  const { buyerWalletAddress, dollarAmount, email, receiveAmount } = transactionDetails;

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
  }
};

// Utility function for hash generation
function generateHash(params: any, salt: any) {
  const crypto = require("crypto");
  const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|||||||||||${salt}`;
  return crypto.createHash("sha512").update(hashString).digest("hex");
}
