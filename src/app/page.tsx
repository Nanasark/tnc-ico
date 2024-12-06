"use client";

import Header from "@/components/header.";
import Hero from "@/components/hero/hero";
// import FiatPay from "@/components/fiatPay";
import InfoSection from "@/components/infoSection";
import Communities from "@/components/communitie";
import Tokenomics from "@/components/tokenomics";
import Roadmap from "@/components/roadmap";
import FiatPay from "@/components/fiatPay";
import Footer from "@/components/footer";
import PayUFiatPay from "@/components/payu";

export default function Home() {
  return (
    <main className="bg-white w-auto flex flex-col">
      <Header />
      <hr />
      <div className="w-full  flex flex-col">
        <div className="pl-5 pr-5">
          <Hero />
        </div>
        <br></br>
        <h1 className="w-full h-[30px] bg-blue-600 content-center font-bold text-[24px] text-center  text-white">
          BUY THE $TNC BEFORE THE PRICE INCREASES
        </h1>

        <div className="mt-4 md:pl-24 w-full md:pr-24 pl-3 pr-3 gap-4 flex flex-col pt-10 items-center justify-center ">
          <h1 className="font-bold text-[16px] text-center md:text-[22px]">
            Buy $TNC WITH OTHER PAYMENT METHODS
          </h1>
          <p>HOW TO BUY?</p>
          {/* <FiatPay /> */}
        <PayUFiatPay/>
        </div>
        <br></br>
        <InfoSection />
        <Communities />
        <Tokenomics />
        <Roadmap />
        <Footer />
      </div>
    </main>
  );
}
