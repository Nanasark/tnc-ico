// 'use server'

// import PayU from 'payu'

// const payuClient = new PayU({
//   key: process.env.PAYU_MERCHANT_KEY!,
//   salt: process.env.PAYU_MERCHANT_SALT!,
// }, process.env.NODE_ENV === 'production' ? 'LIVE' : 'TEST')

// interface PaymentDetails {
//   txnid: string
//   amount: string
//   productinfo: string
//   firstname: string
//   email: string
//   phone: string
// }

// export async function initiatePayment(details: PaymentDetails) {
//   try {
//     const paymentData = {
//       ...details,
//       key: process.env.PAYU_MERCHANT_KEY,
//       surl: ``,
//       furl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/failure`,
//     }

//     const result = await payuClient.paymentInitiate(paymentData)
//     return { success: true, data: result }
//   } catch (error) {
//     console.error('Payment initiation error:', error)
//     return { success: false, error: 'Failed to initiate payment' }
//   }
// }

// export async function verifyPayment(txnid: string) {
//   try {
//     const result = await payuClient.verifyPayment(txnid)
//     return { success: true, data: result }
//   } catch (error) {
//     console.error('Payment verification error:', error)
//     return { success: false, error: 'Failed to verify payment' }
//   }
// }

