// import { NextRequest, NextResponse } from "next/server";
// const PayU = require("payu-websdk");

// const { PAYU_MERCHANT_KEY, PAYU_MERCHANT_SALT, SHEETURL } = process.env;

// const payuClient = new PayU(
//   {
//     key: PAYU_MERCHANT_KEY!,
//     salt: PAYU_MERCHANT_SALT!,
//   },
//   process.env.NODE_ENV === "production" ? "LIVE" : "TEST"
// );

// export async function POST(req: NextRequest) {
//   const { action } = await req.json();

//   if (action === "initiate") {
//     return handleInitiate(req);
//   } else if (action === "verify") {
//     return handleVerify(req);
//   } else {
//     return NextResponse.json({ error: "Invalid action" }, { status: 400 });
//   }
// }

// async function handleInitiate(req: NextRequest) {
//   try {
//     const { buyerWalletAddress, dollarAmount, email, receiveAmount } =
//       await req.json();

//     if (!buyerWalletAddress || !dollarAmount || !email || !receiveAmount) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const transactionId = `txn_${Date.now()}`;
//     const amount = dollarAmount.toFixed(2);
//     const productInfo = "Crypto Purchase";

//     const paymentData = {
//       key: PAYU_MERCHANT_KEY,
//       txnid: transactionId,
//       amount: amount,
//       productinfo: productInfo,
//       firstname: email.split("@")[0],
//       email: email,
//       phone: "9999999999", // Add a phone field in your form or use a default value
//       surl: "https://tnc-ico.vercel.app/success", // Replace with your success URL
//       furl: "https://your-domain.com/payu-failure",
//       udf1: buyerWalletAddress,
//       udf2: receiveAmount.toString(),
//     };

//     const result = await payuClient.paymentInitiate(paymentData);

//     return NextResponse.json({ payuPayload: result });
//   } catch (error) {
//     console.error("Error in PayU initiate:", error);
//     return NextResponse.json(
//       { error: "Failed to initiate PayU transaction" },
//       { status: 500 }
//     );
//   }
// }

// async function handleVerify(req: NextRequest) {
//   try {
//     const { txnid } = await req.json();

//     if (!txnid) {
//       return NextResponse.json(
//         { error: "Missing transaction ID" },
//         { status: 400 }
//       );
//     }

//     const result = await payuClient.verifyPayment(txnid);

//     if (result.status === "1") {
//       // Payment successful, log to sheet
//       await logPaymentSuccess(result);
//       return NextResponse.json({
//         success: true,
//         message: "Payment verified and logged",
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }
//   } catch (error) {
//     console.error("Error in PayU verify:", error);
//     return NextResponse.json(
//       { error: "Failed to verify PayU transaction" },
//       { status: 500 }
//     );
//   }
// }

// async function logPaymentSuccess(paymentDetails: any) {
//   try {
//     if (!SHEETURL) throw new Error("SHEETURL is not defined");

//     const response = await fetch(SHEETURL, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: `Email=${paymentDetails.email}&Wallet=${paymentDetails.udf1}&Receive=${paymentDetails.udf2}&Paid=${paymentDetails.amount}&TransactionId=${paymentDetails.txnid}&Status=Success`,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to log payment success");
//     }
//   } catch (error) {
//     console.error("Error logging payment success:", error);
//   }
// }
