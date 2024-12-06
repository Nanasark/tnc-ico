import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useReadContract } from "thirdweb/react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

export default function FiatPay() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [buyingToken, setBuyingToken] = useState<number>(0);
  const [dollarAmount, setDollarAmount] = useState<number>(0);
  const [next, setNext] = useState<boolean>(false);
  const [emailAddress, setEmail] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const value = String(e.target.value);
    setEmail(value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = String(e.target.value);
    setWalletAddress(value);
  };

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error(
      "Stripe publishable key not found in environment variables"
    );
  }

  const stripe = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const onClick = async () => {
    const res = await fetch("api/stripe-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buyerWalletAddress: walletAddress,
        dollarAmount: dollarAmount,
        email: emailAddress,
        receiveAmount: buyingToken,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      setClientSecret(json.clientSecret);
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
          disabled={!walletAddress}
          onClick={() => {
            onClick();
            setNext(true);
          }}
          className="rounded-full border border-blue-600 hover:bg-gray-900 p-2"
        >
          <IoIosArrowRoundForward className="text-blue-600 text-xl" />
        </button>
      </div>

      {!clientSecret || !next ? (
        <div className="flex flex-col gap-5 items-center text-gray-300  w-full ">
          <div className="flex flex-col-reverse md:flex-row items-center  gap-5 w-full">
            {/* <div className="flex bg-black gap-2 w-full">
              <div className="flex-1 p-2 border border-blue-600 rounded-lg bg-white text-center">
                <p className="text-black">{buyingToken} Tokens</p>
              </div>
               </div> */}
            <div className="flex flex-col w-full p-2">
              <p className="mb-2 text-black text-sm">
                Amount you are paying
              </p>
              <p className="text-black content-center h-[45px] border border-blue-600 rounded-lg  bg-white text-center">
                Pay ${dollarAmount.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col w-full p-2">
              <label htmlFor="tokenAmount" className=" mb-2 text-black text-sm">
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

          <div className="flex flex-col md:flex-row items-center  gap-5 w-full">
            <div className="flex flex-col rounded-lg w-full">
              <label htmlFor="tokenAmount" className="mb-2 text-black text-sm">
                Provide your email
              </label>
              <input
                id="tokenAmount"
                type="email"
                value={emailAddress || ""}
                onChange={handleEmail}
                placeholder="youremail@gmail.com"
                className="w-full text-black  h-[45px] border border-blue-600 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col  rounded-lg w-full">
              <label
                htmlFor="tokenAmount"
                className="mb-2 lowercase text-black text-sm"
              >
                ENTER YOUR WALLET ADDRESS HERE TO RECIEVE $TNC
              </label>
              <input
                id="tokenAmount"
                type="text"
                value={walletAddress || ""}
                onChange={handleAddress}
                placeholder="0x0000000...000"
                className="text-black w-full h-[45px] p-2 border border-blue-600 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={() => {
              onClick();
              setNext(true);
              setIsLoading(true);
            }}
            disabled={!walletAddress}
            className="w-full p-2 bg-blue-600 text-white rounded-[19px] lg:h-[55px] hover:bg-blue-500"
          >
            {isLoading ? "Loading..." : "Pay With Credit Card"}
          </button>
        </div>
      ) : (
        clientSecret &&
        dollarAmount > 0 &&
        next && (
          <Elements
            options={{
              clientSecret: clientSecret,
              appearance: { theme: "night" },
            }}
            stripe={stripe}
          >
            <CreditCardForm dollarAmount={dollarAmount} />
          </Elements>
        )
      )}
    </div>
  );
}

type CreditCardFormProps = {
  dollarAmount: number;
};

const CreditCardForm = ({ dollarAmount }: CreditCardFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const returnUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://tnc-ico.vercel.app";

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: returnUrl },
        redirect: "if_required",
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent?.status === "succeeded") {
        setIsComplete(true);
        alert("Payment complete!");
      }
    } catch (err) {
      alert("There was an error processing your payment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <PaymentElement />
      <button
        onClick={handlePayment}
        disabled={isComplete || isLoading || !elements}
        className="w-48 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
      >
        {isComplete
          ? "Payment Complete"
          : isLoading
          ? "Processing..."
          : `Pay $${dollarAmount.toFixed(2)}`}
      </button>
    </div>
  );
};
