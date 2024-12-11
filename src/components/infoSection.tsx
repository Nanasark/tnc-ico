
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
export default function InfoSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null); 
  const infos = [
    {
      
      text: "TNC is the native utility token of Techs Network, designed to empower IT professionals. Earn, trade, and leverage TNC to unlock premium features, participate in community governance, and access unique platform benefits.",
      alt: "What is TNC?",
    },
    {
    
      text: "Join the TNC ICO and be part of a groundbreaking platform that merges blockchain with professional growth. Help fund and benefit from a project aimed at revolutionizing knowledge sharing in the tech industry.",
      alt: "Why Join Our ICO?",
    },
    {
     
      text: "Participating in the TNC ICO is simple: create an account, connect your wallet, and purchase tokens. Secure your stake in a community-driven project that prioritizes innovation and rewards.",
      alt: "How to Partcipate",
    },
    {
     
      text: "Stake your TNC tokens on our platform and earn attractive APY while contributing to the platform’s stability. Enjoy exclusive perks, governance rights, and enhanced access to premium features.",
      alt: "Staking and Rewards",
    },
  ];
  return (
    <section className="w-full pl-24 pr-24 pt-28 pb-28 flex flex-col gap-5 items-center justify-center bg-blue-600 h-auto">
      <h1 className="text-white text-[36px] font-extrabold text-2xl mb-5">
        QnA
      </h1>
      <div className="w-full flex flex-col gap-3">
        {infos.map((info, index) => (
          <div
            key={index}
            className="bg-white w-full flex flex-col rounded-[18px] shadow-md"
          >
            {/* Title and Dropdown Icon */}
            <div
              className="flex items-center justify-between p-4 border-[1px] rounded-xl border-blue-600 cursor-pointer"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <p className="text-center font-bold text-blue-600 text-[12px] md:text-lg">
                {info.alt}
              </p>
              <IoMdArrowDropdown
                className={`w-7 h-7 text-blue-700 transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Description */}
            {activeIndex === index && (
              <div className="p-4 text-gray-700 text-sm">{info.text}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
