// 'use client'

// import { useState } from 'react'
// import { initiatePayment, verifyPayment } from '../actions/payment'



// export default function PaymentForm() {
//   const [loading, setLoading] = useState(false)
//   const [txnId, setTxnId] = useState('')

//   const handlePayment = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const formData = new FormData(e.target as HTMLFormElement)
//       const details = {
//         txnid: Date.now().toString(),
//         amount: formData.get('amount') as string,
//         productinfo: formData.get('productinfo') as string,
//         firstname: formData.get('firstname') as string,
//         email: formData.get('email') as string,
//         phone: formData.get('phone') as string,
//       }

//       const result = await initiatePayment(details)

//       if (result.success && result.data) {
//         // Create and submit PayU form
//         const form = document.createElement('form')
//         form.innerHTML = result.data
//         document.body.appendChild(form)
//         setTxnId(details.txnid)
//         form.submit()
//       } else {
//         throw new Error('Failed to initiate payment')
//       }
//     } catch (error) {
//       console.error('Payment error:', error)
//       alert('Payment initiation failed. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const checkStatus = async () => {
//     if (!txnId) return
//     setLoading(true)
//     try {
//       const result = await verifyPayment(txnId)
//       if (result.success && result.data) {
//         const status = result.data.transaction_details[txnId].status || 'Unknown'
//         alert(`Transaction status: ${status}`)
//       } else {
//         alert('Failed to check transaction status')
//       }
//     } catch (error) {
//       console.error('Status check error:', error)
//       alert('Failed to check transaction status')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Payment Details</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handlePayment} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="amount">Amount</Label>
//             <Input
//               id="amount"
//               name="amount"
//               type="number"
//               required
//               placeholder="Enter amount"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="productinfo">Product Info</Label>
//             <Input
//               id="productinfo"
//               name="productinfo"
//               required
//               placeholder="Product description"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="firstname">Name</Label>
//             <Input
//               id="firstname"
//               name="firstname"
//               required
//               placeholder="Your name"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               required
//               placeholder="Your email"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone</Label>
//             <Input
//               id="phone"
//               name="phone"
//               required
//               placeholder="Your phone number"
//             />
//           </div>
//           <div className="flex gap-4">
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Processing...' : 'Pay Now'}
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={checkStatus}
//               disabled={loading || !txnId}
//             >
//               Check Status
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

