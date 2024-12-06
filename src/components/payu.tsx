import { useState } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

export default function PayUFiatPay() {
  const [buyingToken, setBuyingToken] = useState<number>(0);
  const [dollarAmount, setDollarAmount] = useState<number>(0);
  const [emailAddress, setEmail] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  const pricePerToken = 0.01;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setBuyingToken(value);
      setDollarAmount(value * pricePerToken);
    } else {
      setBuyingToken(0);
      setDollarAmount(0);
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
  };

  const handlePayU = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/payu-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerWalletAddress: walletAddress,
          dollarAmount,
          email: emailAddress,
          receiveAmount: buyingToken,
        }),
      });

      if (res.ok) {
        const { payuPayload } = await res.json();

        // Redirect to PayU payment page
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://test.payu.in/_payment"; // Change to production URL when live

        Object.keys(payuPayload).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = payuPayload[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        const error = await res.json();
        alert(`PayU error: ${error.error}`);
      }
    } catch (err) {
      console.error("Error initiating PayU payment:", err);
      alert("Unexpected error during PayU transaction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-5 lg:pl-20 lg:pr-20 bg-white border-2 border-blue-600 rounded-[30px]">
      <div className="flex gap-5">
        <button
          onClick={() => setNext(false)}
          className="rounded-full border border-blue-600 hover:bg-gray-900 p-2"
        >
          <IoIosArrowRoundBack className="text-blue-600 text-xl" />
        </button>
        <button
          onClick={() => setNext(true)}
          disabled={!walletAddress}
          className="rounded-full border border-blue-600 hover:bg-gray-900 p-2"
        >
          <IoIosArrowRoundForward className="text-blue-600 text-xl" />
        </button>
      </div>

      {!next ? (
        <div className="flex flex-col gap-5 items-center text-gray-300 w-full">
          <div className="flex flex-col-reverse md:flex-row items-center gap-5 w-full">
            <div className="flex flex-col w-full p-2">
              <p className="mb-2 text-black text-sm">Amount you are paying</p>
              <p className="text-black content-center h-[45px] border border-blue-600 rounded-lg bg-white text-center">
                Pay ${dollarAmount.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col w-full p-2">
              <label htmlFor="tokenAmount" className="mb-2 text-black text-sm">
                How many tokens do you want?
              </label>
              <input
                id="tokenAmount"
                type="number"
                value={buyingToken || ""}
                onChange={handleChange}
                placeholder="0"
                className="w-full h-[45px] text-black p-2 border border-blue-600 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-5 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="mb-2 text-black text-sm">
                Provide your email
              </label>
              <input
                id="email"
                type="email"
                value={emailAddress || ""}
                onChange={handleEmail}
                placeholder="youremail@gmail.com"
                className="w-full text-black h-[45px] p-2 border border-blue-600 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="walletAddress"
                className="mb-2 lowercase text-black text-sm"
              >
                Enter your wallet address to receive $TNC
              </label>
              <input
                id="walletAddress"
                type="text"
                value={walletAddress || ""}
                onChange={handleAddress}
                placeholder="0x0000000...000"
                className="w-full text-black h-[45px] p-2 border border-blue-600 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handlePayU}
            disabled={!walletAddress}
            className="w-full p-2 bg-green-600 text-white rounded-[19px] lg:h-[55px] hover:bg-green-500"
          >
            {isLoading ? "Loading..." : "Pay With PayU"}
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-700">
          <h1 className="text-2xl font-bold">Redirecting to PayU...</h1>
        </div>
      )}
    </div>
  );
}
