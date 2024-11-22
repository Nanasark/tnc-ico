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
import { polygonAmoy } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";

export default function CryptoPay() {
  const account = useActiveAccount();
  const address = account?.address;
  const [payValue, setPayValue] = useState<string>("");
  const [receiveValue, setReceiveValue] = useState<string>("");
  const { data: tokenSaleprice } = useReadContract({
    contract: contractIco,
    method: "getTokenPrice",
  });
  const price = tokenSaleprice
    ? parseFloat(toEther(tokenSaleprice))
    : parseFloat("0.0001");

  const { mutateAsync: sendTx, isSuccess } = useSendTransaction();

  const handleBuy = async () => {
    try {
      const transaction = prepareContractCall({
        contract: contractIco,
        value: BigInt(toWei(payValue)),
        method: "buyToken",
        params: [BigInt(receiveValue)],
      }) as PreparedTransaction;

      console.log(BigInt(toWei(payValue)));
      console.log(toWei(receiveValue));

      await sendTx(transaction);
      if (isSuccess) {
        console.log("transaction success");
        alert("transaction successful. please check balance :)");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseFloat(value);

    if (!isNaN(numberValue) && numberValue >= 0) {
      setPayValue(value);
      setReceiveValue((numberValue / price).toFixed(5));
    } else {
      setPayValue("");
      setReceiveValue("");
    }
  };

  const handleReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseFloat(value);

    if (!isNaN(numberValue) && numberValue >= 0) {
      setReceiveValue(value);
      setPayValue((numberValue * price).toFixed(5));
    } else {
      setReceiveValue("");
      setPayValue("");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 border-[1px] p-5 rounded-[15px] border-blue-500 h-[300px]">
      <div className="flex gap-5 w-full">
        <div>
          <Image alt="coin Image" src="/coin.png" width={70} height={70} />
        </div>
        <div className="w-full gap-2  flex flex-col">
          <div className="flex gap-2">
            {" "}
            <p className="text-[13px]">Stage 1</p>
            <p className="text-[11px]">20000/1000000 $TNC</p>
          </div>
          <div className="barGradient rounded-[25px] w-full h-[10px]"></div>
        </div>
      </div>
      <div className=" flex flex-col gap-3">
        <div className="p-[2px] pl-[5px] pr-[5px] flex items-center justify-between w-full h-[45px] rounded-[11px] border-[1px] border-blue-500">
          <p>Pay:</p>
          <div>
            <input
              className="pl-3 h-full w-3/4 outline-none rounded-md"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={payValue}
              onChange={handlePayChange}
            />
          </div>
          <p className=" p-2 w-[80px] h-full rounded-[11px] text-center border-blue-500 border-[1px]">
            BNB
          </p>
        </div>
        <div className="p-[2px] pl-[5px] pr-[5px] flex items-center justify-between w-full h-[45px] rounded-[11px] border-[1px] border-blue-500">
          <p>Receive:</p>
          <div>
            <input
              className="pl-3 h-full w-3/4 outline-none rounded-md"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={receiveValue}
              onChange={handleReceiveChange}
            />
          </div>
          <p className=" p-2 w-[80px] h-full rounded-[11px] text-center border-blue-500 border-[1px]">
            $TNC
          </p>
        </div>
      </div>

      <div>
        {address ? (
          <button
            onClick={() => handleBuy()}
            className=" text-center w-full h-[45px] rounded-[11px] border-blue-500 border-[1px]"
          >
            Buy $TNC
          </button>
        ) : (
          <ConnectButton client={client} chain={polygonAmoy} />
        )}
      </div>
    </div>
  );
}
