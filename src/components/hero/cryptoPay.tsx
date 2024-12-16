// import Image from "next/image";
// import { useState } from "react";
// import {
//   prepareContractCall,
//   PreparedTransaction,
//   toEther,
//   toWei,
// } from "thirdweb";
// import { contractIco } from "@/app/contract";
// import { ConnectButton, useSendTransaction } from "thirdweb/react";
// import { useActiveAccount } from "thirdweb/react";
// import { client } from "@/app/client";
// import { useReadContract } from "thirdweb/react";
// import { Work_Sans } from "next/font/google";
// import { createWallet } from "thirdweb/wallets";
// import ProgressBar from "./progressBar";
// import { chain } from "@/app/chain";
// const work_sans = Work_Sans({ subsets: ["latin"] });

// export default function CryptoPay() {
//   const account = useActiveAccount();
//   const address = account?.address;
//   const [payValue, setPayValue] = useState<string>("");
//   const [receiveValue, setReceiveValue] = useState<string>("");
//   const [receiveAmount, setReceiveAmount] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const { data: tokenSaleprice } = useReadContract({
//     contract: contractIco,
//     method: "getTokenPrice",
//   });

//   const { data: soldTokens } = useReadContract({
//     contract: contractIco,
//     method: "soldTokens",
//   });

//   const tokensSold = soldTokens ? soldTokens : 0;
//   const price = tokenSaleprice
//     ? parseFloat(toEther(tokenSaleprice))
//     : parseFloat("1");

//   const { mutateAsync: sendTx, isSuccess } = useSendTransaction();
//   // console.log(soldTokens);
//   const wallets = [
//     createWallet("io.metamask"),
//     createWallet("com.trustwallet.app"),
//   ];

//   const handleBuy = async () => {
//     try {
//       console.log(BigInt(toWei(payValue)));
//       console.log(toWei(receiveValue));
//       const receiveAmount = toWei(receiveValue);
//       console.log(`receiveAMOINT: ${receiveAmount} `);
//       console.log(`receiveEtherAMOINT: ${toEther(receiveAmount)} `);

//       const receiveEtherAmount = toEther(BigInt(receiveAmount))
//       console.log(`fixed`, Number(receiveEtherAmount).toFixed(0).toString());
//       const transaction = prepareContractCall({
//         contract: contractIco,
//         value: BigInt(toWei(payValue)),
//         method: "buyToken",
//         params: [BigInt((Number(receiveEtherAmount).toFixed(0)).toString())],
//       }) as PreparedTransaction;

//       await sendTx(transaction);
//       setLoading(true);
//       if (isSuccess) {
//         console.log("transaction success");
//         alert("transaction successful. please check balance :)");
//         setLoading(false);
//       }
//     } catch (error: any) {
//       console.log(error);
//       console.log(BigInt(toWei(payValue)));
//       console.log(receiveValue);
//       alert(error.message);
//     }
//   };

//   const handlePayChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     const numberValue = parseFloat(value);

//     if (!isNaN(numberValue) && numberValue >= 0) {
//       setPayValue(value);
//       setReceiveValue((numberValue / price).toFixed(5));
//     } else {
//       setPayValue("");
//       setReceiveValue("");
//     }
//   };

//   const handleReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     const numberValue = parseFloat(value);

//     if (!isNaN(numberValue) && numberValue >= 0) {
//       setReceiveValue(value);
//       setPayValue((numberValue * price).toFixed(5));
//     } else {
//       setReceiveValue("");
//       setPayValue("");
//     }
//   };

//   return (
//     <div
//       className={`${work_sans.className} w-[360px] lg:w-[400px] 2xl:h-[600px] 2xl:w-[500px] h-[400px] lg:h-[440px] xl:h-[480px] flex flex-col gap-8 items-center justify-center  border-[1px] p-5 rounded-[40px] border-blue-500 `}
//     >
//       <div className="flex gap-8 w-full">
//         <div>
//           <Image alt="coin Image" src="/coins.png" width={100} height={100} />
//         </div>
//         <div className="w-full gap-2 leading-5 flex flex-col">
//           <div className="flex flex-col gap-2">
//             {" "}
//             <p className="text-[18px]">Stage 1</p>
//             <p className="text-[18px] font-semibold">
//               {tokensSold.toString()}/1000000 $TNC
//             </p>
//           </div>
//           <div className="bg-black rounded-[25px] w-full h-[10px]">
//             <ProgressBar purchased={Number(tokensSold)} />
//           </div>
//         </div>
//       </div>
//       <div className=" flex flex-col gap-8 2xl:w-full">
//         <div className="p-[2px] pl-[5px] pr-[5px] flex items-center justify-between w-full h-[45px] 2xl:h-[80px] rounded-[11px] border-[1px] border-blue-500">
//           <p className="2xl:text-[25px]">Pay:</p>
//           <div>
//             <input
//               className="2xl:text-[25px] pl-3 h-full w-3/4 outline-none rounded-md"
//               type="number"
//               step="0.01"
//               placeholder="Enter amount"
//               value={payValue}
//               onChange={handlePayChange}
//             />
//           </div>
//           <p className=" 2xl:text-[25px]  p-2 2xl:p-5  w-[80px] 2xl:w-[120px] h-full rounded-[11px] text-center content-center border-blue-500 border-[1px]">
//             BNB
//           </p>
//         </div>
//         <div className=" 2xl:text-[25px] 2xl:h-[80px] p-[2px] pl-[5px] pr-[5px] flex items-center justify-between w-full h-[45px] rounded-[11px] border-[1px] border-blue-500">
//           <p className="2xl:text-[25px] ">Receive:</p>
//           <div>
//             <input
//               className="pl-3 h-full w-3/4 outline-none rounded-md"
//               type="number"
//               step="0.01"
//               placeholder="Enter amount"
//               value={receiveValue}
//               onChange={handleReceiveChange}
//             />
//           </div>
//           <p className=" 2xl:text-[25px]  p-2 w-[80px]  2xl:w-[120px] content-center h-full rounded-[11px] text-center border-blue-500 border-[1px]">
//             $TNC
//           </p>
//         </div>
//       </div>

//       <div className="w-full">
//         {address ? (
//           <button
//             type="button"
//             disabled={!receiveValue || !payValue}
//             onClick={() => handleBuy()}
//             className=" text-center w-full h-[45px] text-[18px] rounded-[40px] border-blue-500 border-[1px]"
//           >
//             {loading ? "loading..." : " Buy $TNC"}
//           </button>
//         ) : (
//           <ConnectButton
//             client={client}
//             chain={chain}
//             theme={"light"}
//             wallets={wallets}
//             showAllWallets={false}
//             supportedTokens={{
//               56: [
//                 {
//                   name: "TECHS NETWORK TOKEN",
//                   address: "0x170b47f039d006396929F7734228fFc53Ab155b2",
//                   symbol: "TNC",
//                 },
//               ],
//             }}
//             connectButton={{
//               className: "connect",
//               label: "Sign in",
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import { useState } from "react";
import {
  prepareContractCall,
  PreparedTransaction,
  toEther,
  toWei,
} from "thirdweb";
import { contractIco } from "@/app/contract";
import { ConnectButton, useSendTransaction } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";
import { useReadContract } from "thirdweb/react";
import { Work_Sans } from "next/font/google";
import { createWallet } from "thirdweb/wallets";
import ProgressBar from "./progressBar";
import { chain } from "@/app/chain";
import { isAddress } from "thirdweb";
const work_sans = Work_Sans({ subsets: ["latin"] });

export default function CryptoPay() {
  const account = useActiveAccount();
  const address = account ? account.address : "";
  const [payValue, setPayValue] = useState<string>("");
  const [receiveValue, setReceiveValue] = useState<string>("");
   const [referrar, setReferrar] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: tokenSaleprice } = useReadContract({
    contract: contractIco,
    method: "rate",
  });


  console.log("rate:", tokenSaleprice);
    const { data: weiRaised} = useReadContract({
      contract: contractIco,
      method: "weiRaised",
    });

  const bnbRaised = weiRaised ? toEther(weiRaised) : 0
  
  const tokensSold = Number(bnbRaised ) * 610;
  
  const price = tokenSaleprice
    ? parseFloat(toEther(tokenSaleprice))
    : parseFloat("1");

  const { mutateAsync: sendTx, isSuccess, isPending } = useSendTransaction();
  // console.log(soldTokens);
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.trustwallet.app"),
  ];

  const handleBuy = async () => {
    try {
      console.log(BigInt(toWei(payValue)));
      console.log(toWei(receiveValue));
      const receiveAmount = toWei(receiveValue);
      console.log(`receiveAMOINT: ${receiveAmount} `);
      console.log(`receiveEtherAMOINT: ${toEther(receiveAmount)} `);

      const receiveEtherAmount = toEther(BigInt(receiveAmount));
      console.log(`fixed`, Number(receiveEtherAmount).toFixed(0).toString());
      const transaction = prepareContractCall({
        contract: contractIco,
        value: BigInt(toWei(payValue)),
        method: "buyTokens",
        params: [address,referrar],
      }) as PreparedTransaction;

      await sendTx(transaction);
      if (isPending) {
        setLoading(true);
      }

      else if (isSuccess) {
        setLoading(false);
        console.log("transaction success");
        alert("transaction successful. please check balance :)");
        setLoading(false);
      }

      
    } catch (error: any) {
      console.log(error);
      console.log(BigInt(toWei(payValue)));
      console.log(receiveValue);
      alert(error.message);
    }
  };

  const handlePayChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseFloat(value);

    if (!isNaN(numberValue) && numberValue >= 0) {
      setPayValue(value);
      setReceiveValue((numberValue * price).toFixed(2));
    } else {
      setPayValue("");
      setReceiveValue("");
    }
  };

   const handleRefer = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value;

     if (isAddress(value)) {
       setReferrar(value);
      
     } else {
      setReferrar("");
     }
   };

  return (
    <div
      className={`${work_sans.className} w-[360px] lg:w-[400px] 2xl:h-[600px] 2xl:w-[500px] h-[400px] lg:h-[440px] xl:h-[480px] flex flex-col gap-8 items-center justify-center  border-[1px] p-5 rounded-[40px] border-blue-500 `}
    >
      <div className="flex gap-8 w-full">
        <div>
          <Image alt="coin Image" src="/coins.png" width={100} height={100} />
        </div>
        <div className="w-full gap-2 leading-5 flex flex-col">
          <div className="flex flex-col gap-2">
            {" "}
            <p className="text-[18px]">Stage 1</p>
            <p className="text-[18px] font-semibold">{tokensSold}/1000000 $TNC</p>
          </div>
          <div className="bg-black rounded-[25px] w-full h-[10px]">
            <ProgressBar purchased={Number(1000)} />
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-8 2xl:w-full">
        <div className="p-[2px] pl-[5px] pr-[5px] flex items-center justify-between w-full h-[45px] 2xl:h-[80px] rounded-[11px] border-[1px] border-blue-500">
          <p className="2xl:text-[25px]">Pay:</p>
          <div>
            <input
              className="2xl:text-[25px] pl-3 h-full w-3/4 outline-none rounded-md"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={payValue}
              onChange={handlePayChange}
            />
          </div>
          <p className=" 2xl:text-[25px]  p-2 2xl:p-5  w-[80px] 2xl:w-[120px] h-full rounded-[11px] text-center content-center border-blue-500 border-[1px]">
            BNB
          </p>
        </div>
        <div className=" 2xl:text-[25px] 2xl:h-[80px] p-[2px] pl-[5px] pr-[5px] flex items-center justify-between w-full h-[45px] rounded-[11px] border-[1px] border-blue-500">
          <p className="2xl:text-[25px] ">Receive:</p>
          <div>
            <div className="pl-3 h-full w-3/4 outline-none rounded-md">
              {receiveValue}
            </div>
          </div>
          <p className=" 2xl:text-[25px]  p-2 w-[80px]  2xl:w-[120px] content-center h-full rounded-[11px] text-center border-blue-500 border-[1px]">
            $TNC
          </p>
        </div>
        <div className="p-[2px] pl-[5px] pr-[5px] flex items-center justify-between w-full h-[45px] 2xl:h-[80px] rounded-[11px] border-[1px] border-blue-500">
          <p className="2xl:text-[25px]">Referrar address:</p>
          <div>
            <input
              className="2xl:text-[25px] pl-3 h-full w-3/4 outline-none rounded-md"
              type="text"
              placeholder="wallet address"
              onChange={handleRefer}
            />
          </div>
        
        </div>
      </div>

      <div className="w-full">
        {address ? (
          <button
            type="button"
            disabled={!receiveValue || !payValue}
            onClick={() => handleBuy()}
            className=" text-center w-full h-[45px] text-[18px] rounded-[40px] border-blue-500 border-[1px]"
          >
            {loading ? "loading..." : isSuccess ? "Buy $TNC" : " Buy $TNC"}
          </button>
        ) : (
          <ConnectButton
            client={client}
            chain={chain}
            theme={"light"}
            wallets={wallets}
            showAllWallets={false}
            supportedTokens={{
              56: [
                {
                  name: "TECHS NETWORK TOKEN",
                  address: "0x170b47f039d006396929F7734228fFc53Ab155b2",
                  symbol: "TNC",
                },
              ],
            }}
            connectButton={{
              className: "connect",
              label: "Sign in",
            }}
          />
        )}
      </div>
    </div>
  );
}
