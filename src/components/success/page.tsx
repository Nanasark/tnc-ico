// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// export const dynamic = "force-dynamic";

// export default function Success() {
//   const [status, setStatus] = useState<"loading" | "success" | "error">(
//     "loading"
//   );
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const params = Object.fromEntries(searchParams.entries());

//     const verifyPayment = async () => {
//       const { txnid, amount, status, hash, email, address1, address2 } = params;

//       if (txnid && amount && status && hash) {
//         try {
//           const response = await fetch("/api/payu-webhook", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               buyerWalletAddress: address1,
//               receiveAmount: address2,
//               txnid,
//               amount,
//               status,
//               hash,
//               email,
//             }),
//           });

//           if (response.ok) {
//             setStatus("success");
//           } else {
//             setStatus("error");
//           }
//         } catch (error) {
//           console.error("Error verifying payment:", error);
//           setStatus("error");
//         }
//       } else {
//         setStatus("error");
//       }
//     };

//     verifyPayment();
//   }, [searchParams]);

//   if (status === "loading") {
//     return <div>Verifying payment...</div>;
//   }

//   if (status === "error") {
//     return (
//       <div>
//         There was an error processing your payment. Please contact support.
//       </div>
//     );
//   }

//   return <div>Payment successful! Thank you for your purchase.</div>;
// }
