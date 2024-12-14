import { name } from "thirdweb/extensions/common";
import { League_Spartan } from "next/font/google";
const league_spartan = League_Spartan({ subsets: ["latin"] });
export default function Text() {
  const buttons = [
    {
      link: "/whitepaper.pdf",
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
      className={` ${league_spartan.className} 2xl:!mt-20  text-center  xl:mt-10 my-screen:!mt-[-50px] relative xl:top-[50px] lg:ml-10 pl-12 lg:pl-0 pr-12 lg:pr-0 flex flex-col h-full gap-3  w-full  content-center text-blue-500`}
    >
      <h1
        className={`2xl:!text-[110px] relative z-0 font-bold text-[46px] md:text-[40px] lg:text-[70px] xl:text-[90px] lg:leading-tight`}
      >
        $TNC Token <br></br> Sale is On
      </h1>
      <p className="2xl:text-[1.5rem] text-black font-bold text-center  md:text-center text-[12px] lg:text-[20px]">
        Empowering IT professionals, One Token at a Time
      </p>
      <div className="flex flex-col w-full 2xl:px-5 text-center content-center gap-5">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="font-bold  rounded-[25px] h-[45px] 2xl:!h-[4.5rem] 2xl:text-[2rem]  border-blue-500 border-[1px] items-center  "
          >
            <a
              className="w-full h-full relaive "
              key={index}
              href={button.link} // Set the link to the PDF
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security best practice
            >
              {button.text}
            </a>
          </button>
        ))}
      </div>
    </div>
  );
}
