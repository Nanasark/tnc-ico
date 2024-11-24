import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";
import { polygonAmoy } from "thirdweb/chains";

export default function Header() {
  return (
    <header className="relative h-[50px] bg-blue-500 w-full">
      <ConnectButton
        client={client}
        chain={polygonAmoy}
        supportedTokens={{
          80002: [
            {
              name: "ftc",
              address: "0x852e64595771b938B970e1Dc87C69A0f66bb4dD4",
              symbol: "ftc",
            },
          ],
        }}
      />
    </header>
  );
}
