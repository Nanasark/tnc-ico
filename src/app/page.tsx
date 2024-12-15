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
import UPI from "@/components/upi";

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

        <div className=" md:pl-24 min-h-[100dvh] w-full lg:h-[600px] xl:min-h-[710px] bg-blue-50  my-screen:h-[90dvh] md:pr-24 pl-3 pr-3  flex flex-col  items-center justify-center ">
          {/* <FiatPay /> */}
          {/* <PayUFiatPay /> */}
          <UPI />
        </div>
       
        <InfoSection />
        <Communities />
        <Tokenomics />
        <Roadmap />
        <Footer />
      </div>
    </main>
  );
}
