"use client";

import Header from "@/components/header.";

import FiatPay from "@/components/fiatPay";

export default function Home() {
  return (
    <main className="bg-white w-screen flex flex-col">
      <Header />
      <div className="w-full p-3 flex flex-col gap-5">
        <FiatPay />
      </div>
    </main>
  );
}
