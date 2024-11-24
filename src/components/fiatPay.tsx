import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useActiveAccount } from "thirdweb/react";

import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

export default function FiatPay() {
  const address = useActiveAccount()?.address;
  const [clientSecret, setClientSecret] = useState<string>("");
  const [buyingToken, setBuyingToken] = useState<number>(0);
  const [dollarAmount, setDollarAmount] = useState<number>(0);
  const [next, setNext] = useState<boolean>(false);
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
        buyerWalletAddress: address,
        dollarAmount: dollarAmount,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      setClientSecret(json.clientSecret);
    }
  };

  return (
    <div className="flex gap-5 flex-col items-center justify-center p-5 lg:p-10 bg-white border-2 border-gray-800 shadow-xl rounded-lg">
      <div className="flex gap-5">
        <button
          onClick={() => setNext(false)}
          className="rounded-full border bg-sky-700 border-blue-600 hover:bg-gray-900 p-2"
        >
          <IoIosArrowRoundBack className="text-white text-xl" />
        </button>
        <button
          disabled={!address}
          onClick={() => {
            onClick();
            setNext(true);
          }}
          className="rounded-full border bg-sky-700 border-blue-600 hover:bg-gray-900 p-2"
        >
          <IoIosArrowRoundForward className="text-white text-xl" />
        </button>
      </div>

      {!clientSecret || !next ? (
        <div className="flex flex-col gap-5 items-center text-gray-300 w-full max-w-md">
          <div className="flex flex-col border border-blue-600 rounded-lg p-5 w-full">
            <label htmlFor="tokenAmount" className="mb-2 text-sm">
              Enter token amount:
            </label>
            <input
              id="tokenAmount"
              type="number"
              value={buyingToken || ""}
              onChange={handleChange}
              placeholder="0"
              className="w-full p-2 border border-blue-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 w-full">
            <div className="flex-1 p-2 border border-blue-600 rounded-lg bg-gray-900 text-center">
              <p>{buyingToken} Tokens</p>
            </div>
            <div className="flex-1 p-2 border border-blue-600 rounded-lg bg-gray-900 text-center">
              <p>Pay ${dollarAmount.toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={() => {
              onClick();
              setNext(true);
              setIsLoading(true);
            }}
            disabled={!address}
            className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
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
      : "https://fiat-crypto.vercel.app";

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
