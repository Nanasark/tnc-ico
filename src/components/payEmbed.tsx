// import { client } from '@/app/client'
// import React from 'react'
// import { polygonAmoy } from 'thirdweb/chains'
// import { PayEmbed } from 'thirdweb/react'

// export const payEmbed = () => {
//   return (
//       <div>
//            <div className="flex flex-col justify-center">
//             <PayEmbed
//               payOptions={{
//                 metadata: { name: "namea" },
//                 prefillBuy: {
//                   token: {
//                     name: "testtnc",
//                     address: "0xab0DB6DEF25D74861897fcaE248a75c5D8D19C34",
//                     symbol: "ttnc",
//                     icon: "...", // optional
//                   },
//                   chain: polygonAmoy,
//                   allowEdits: {
//                     amount: true, // allow editing buy amount
//                     token: false, // disable selecting buy token
//                     chain: false, // disable selecting buy chain
//                   },
//                 },
//               }}
//               client={client}
//               supportedTokens={{
//                 80002: [
//                   {
//                     name: "testtnc",
//                     address: "0xab0DB6DEF25D74861897fcaE248a75c5D8D19C34",
//                     symbol: "ttnc",
//                   },
//                 ],
//               }}
//             />
//             </div>
//     </div>
//   )
// }
