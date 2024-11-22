"use client";

import Header from "@/components/header.";
import Image from "next/image";
import { ConnectButton, PayEmbed } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { base, polygonAmoy } from "thirdweb/chains";
import Hero from "@/components/hero/hero";
// import FiatPay from "@/components/fiatPay";
import InfoSection from "@/components/infoSection";
import Communities from "@/components/communitie";
import Tokenomics from "@/components/tokenomics";
import Roadmap from "@/components/roadmap";
import FiatPay from "@/components/fiatPay";

export default function Home() {
  return (
    <main className=" w-screen flex flex-col">
      <Header />
      <div className="w-full p-3">
        <Hero />
        <FiatPay />
        <InfoSection />
        <Communities />
        <Tokenomics />
        <Roadmap />
      </div>
    </main>
  );
}
