"use client";

import Header from "@/components/header";
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
    <main className=" w-screen flex flex-col justify-center ">
      <Header />
      <hr />
      <div className="w-full  flex flex-col ">
        <div className=" w-full  md:h-[450px] lg:h-[510px] xl:h-[88.7dvh] my-screen:h-[85dvh] 2xl:!h-[91dvh] pl-5 pr-5">
          <Hero />
        </div>

        <h1 className="w-full h-[30px] bg-blue-600 content-center font-bold text-[12px] md:text-[24px] text-center  text-white">
          BUY THE $TNC BEFORE THE PRICE INCREASES
        </h1>

        <div className="mt-4 md:pl-24 space-y-10 w-full lg:h-[600px] xl:min-h-[710px]  my-screen:h-[600px] md:pr-24 pl-3 pr-3 gap-4 flex flex-col pt-10 items-center justify-center ">
          <h1 className="font-bold text-[16px] text-center md:text-[22px]">
            Buy $TNC WITH OTHER PAYMENT METHODS coming soon ...
          </h1>
          <p>HOW TO BUY?</p>
          {/* <FiatPay /> */}
          <PayUFiatPay />
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
