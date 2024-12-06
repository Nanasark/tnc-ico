import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const PayU = require("payu-websdk");

// Initialize PayU client
const payuClient = new PayU(
  {
    key: process.env.PAYU_MERCHANT_KEY,
    salt: process.env.PAYU_MERCHANT_SALT,
  },
  "TEST"
); // Change to "TEST" if in development

const { PAYU_WEBHOOK_SECRET_KEY, SHEETURL } = process.env;

export async function POST(req: NextRequest) {
  if (!PAYU_WEBHOOK_SECRET_KEY) {
    throw new Error("Did you forget to add the webhook secret in .env.local?");
  }

  const body = await req.text();
  const sig = headers().get("payu-signature") as string;

  if (!sig) {
    throw new Error("No signature provided");
  }

  // Assuming PayU uses similar webhook signature validation as Stripe
  if (!verifyPayUSignature(body, sig, PAYU_WEBHOOK_SECRET_KEY)) {
    throw new Error("Invalid signature");
  }

  const event = JSON.parse(body);

  switch (event.type) {
    case "payment_initiate":
      await handlePaymentInitiate(event.data);
      break;

    case "verify_payment":
      await handleVerifyPayment(event.data.txnid);
      break;

    default:
      throw new Error(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ message: "success" });
}

// Function to verify PayU webhook signature
const verifyPayUSignature = (body: string, sig: string, secret: string) => {
  // You can implement your signature verification logic here (like Stripe)
  // Assuming PayU provides a similar signature process for webhook validation
  return sig === secret; // Dummy validation, replace with actual signature validation
};

// Function to handle payment initiation
const handlePaymentInitiate = async (data:any) => {
  const { txnid, amount, firstname, email, productinfo } = data;

  if (!txnid || !amount || !firstname || !email || !productinfo) {
    throw new Error("Missing required fields");
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
    surl: "https://yourdomain.com/success",
    furl: "https://yourdomain.com/failure",
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
const handleVerifyPayment = async (txnid:string) => {
  try {
    const response = await payuClient.verifyPayment(txnid);

    if (response.status === 1) {
      // Example: Assuming you want to record payment success
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
const handlePaymentSuccess = async (transactionDetails:any) => {
  const { buyerWalletAddress, dollarAmount, email, receiveAmount } =
    transactionDetails;

  if (!buyerWalletAddress || !email) {
    throw new Error("Email and address missing");
  }

  try {
    const url = `${SHEETURL}`;
    const tx = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `Email=${email}&Wallet=${buyerWalletAddress}&Receive=${receiveAmount}&Paid=${dollarAmount}`,
    });

    if (!tx.ok) {
      throw new Error("Purchase failed");
    }
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
};

// Utility function for hash generation
function generateHash(params:any, salt:any) {
  const crypto = require("crypto");
  const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|||||||||||${salt}`;
  return crypto.createHash("sha512").update(hashString).digest("hex");
}
