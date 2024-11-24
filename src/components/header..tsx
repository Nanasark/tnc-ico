import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";
import { polygonAmoy } from "thirdweb/chains";

export default function Header() {
  return (
    <header className="relative h-[60px] bg-green-900 w-full">
      <ConnectButton
        client={client}
        chain={polygonAmoy}
        supportedTokens={{
          80002: [
            {
              name: "testtnc",
              address: "0xab0DB6DEF25D74861897fcaE248a75c5D8D19C34",
              symbol: "ttnc",
            },
          ],
        }}
      />
    </header>
  );
}
