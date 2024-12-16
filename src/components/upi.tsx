"use client";

import Image from "next/image";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

export default function UPI() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("");
  const [moneyPaid, setMoneyPaid] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/upi-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          address,
          phone,
          upiId,
          moneyPaid,
        }),
      });

      if (res.ok) {
        alert("details submitted successfully");
      }
      // Handle response
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText("Info@techs.network").then(() => {
      alert("Support email copied to clipboard! Info@techs.network");
    });
  }

  function copyUpiId() {
    navigator.clipboard.writeText("tallammallikarjuna@okhdfcbank").then(() => {
      alert("UPI ID copied to clipboard!  ");
    });
  }

  return (
    <section className="flex flex-col h-full bg-blue-200">
      <h1 className="font-bold text-blue-600 text-[16px] text-center md:text-[22px]">
        Buy $TNC with UPI ...
      </h1>
      <div className="bg-blue-300 p-4 lg:hidden">
        <div className="max-w-md mx-auto bg-white rounded-full p-1 flex justify-between">
          <button
            onClick={() => setShowForm(false)}
            className={`w-1/2 py-2 px-4 rounded-full transition duration-300 ease-in-out ${
              !showForm
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
            Show QR Code
          </button>
          <button
            onClick={() => setShowForm(true)}
            className={`w-1/2 py-2 px-4 rounded-full transition duration-300 ease-in-out ${
              showForm
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
            Show Form
          </button>
        </div>
      </div>

      <div className="flex-grow lg:flex">
        <div
          className={`w-full lg:w-1/2 ${
            !showForm ? "block" : "hidden lg:block"
          }`}
        >
          <div className="h-full flex flex-col justify-center items-center bg-blue-100 p-4">
            <p className="text-blue-600 text-sm mb-4 text-center">
              Scan the QR code below to make your payment
            </p>
            <Image
              src="/upi.jpg"
              alt="UPI QR Code"
              width={300}
              height={300}
              className="mb-4"
            />
            <div className="flex items-center justify-center space-x-2">
              <p className="text-blue-600 text-sm">
                UPI ID: tallammallikarjuna@okhdfcbank
              </p>
              <button
                onClick={copyUpiId}
                className="text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <IoCopyOutline size={20} />
              </button>
            </div>
            <p className="text-blue-600 text-xs text-center mt-2">
              After scanning and making the payment, please fill out the form.
            </p>
          </div>
        </div>

        <div
          className={`w-full lg:w-1/2 p-8 bg-blue-300 ${
            showForm ? "block" : "hidden lg:block"
          }`}
        >
          <form onSubmit={handleForm} className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              UPI Information
            </h2>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-blue-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 h-[42px] lg:h-[45px] pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-blue-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-[42px] lg:h-[45px] pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-blue-600"
              >
                Wallet Address
              </label>
              <input
                placeholder="crypto wallet address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 h-[42px] lg:h-[45px] pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-blue-600"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 h-[42px] lg:h-[45px] pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                required
                placeholder="phone number"
              />
            </div>
            <div>
              <label
                htmlFor="money"
                className="block text-sm font-medium text-blue-600"
              >
                Money Paid
              </label>
              <input
                type="text"
                id="money"
                value={moneyPaid}
                onChange={(e) => setMoneyPaid(e.target.value)}
                className="mt-1 h-[42px] lg:h-[45px] pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                required
                placeholder="amount you paid"
              />
            </div>
            <div>
              <label
                htmlFor="upiId"
                className="block text-sm font-medium text-blue-600"
              >
                UPI ID
              </label>
              <input
                type="text"
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-1 h-[42px] lg:h-[45px] pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                required
                placeholder="UPI ID"
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  disabled={isLoading}
                >
                  Submit
                </button>
                {isLoading && (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                )}
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="h-[45px] text-blue-600 text-sm hover:underline focus:outline-none"
              >
                Contact Support
              </button>
            </div>
          </form>
          <p className="text-xs text-blue-600 mt-4 text-center">
            If you don&apos;t receive payment confirmation within 24 hours,
            please contact our support team.
          </p>
        </div>
      </div>
    </section>
  );
}
