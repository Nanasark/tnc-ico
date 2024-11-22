"use client";

import Header from "@/components/header.";
import Hero from "@/components/hero/hero";
// import FiatPay from "@/components/fiatPay";
import InfoSection from "@/components/infoSection";
import Communities from "@/components/communitie";
import Tokenomics from "@/components/tokenomics";
import Roadmap from "@/components/roadmap";
import FiatPay from "@/components/fiatPay";

export default function Home() {
  return (
    <main className="bg-white w-screen flex flex-col">
      <Header />
      <div className="w-full p-3 flex flex-col gap-5">
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
