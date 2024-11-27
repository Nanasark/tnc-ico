import { name } from "thirdweb/extensions/common";
import { League_Spartan } from "next/font/google";
const league_spartan = League_Spartan({ subsets: ["latin"] });
export default function Text() {
  const buttons = [
    {
      link: "#",
      text: "READ WHITEPAPER",
    },
    {
      link: "#",
      text: "BUY $TNC Credit/Debit card",
    },

    {
      link: "#",
      text: "Add Token to Wallet",
    },
  ];
  return (
    <div
      className={`${league_spartan.className} pl-12 pr-12 flex flex-col h-full mt-16 gap-3  w-full  text-blue-500`}
    >
      <h1 className={` font-bold text-[46px]`}>
        $TNC Token <br></br> Sale is On
      </h1>
      <p className="text-black font-bold text-center md:text-left text-[12px]">
        Empowering IT professionals, One Token at a Time
      </p>
      <div className="flex flex-col gap-5">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="w-full font-bold rounded-[25px] h-[45px]  border-blue-500 border-[1px] items-center  "
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
}
