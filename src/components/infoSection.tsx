import Image from "next/image";
export default function InfoSection() {
  const infos = [
    {
      img: "/first.png",
      text: "TNC is the native utility token of Techs Network, designed to empower IT professionals. Earn, trade, and leverage TNC to unlock premium features, participate in community governance, and access unique platform benefits.",
      alt: "What is TNC?",
    },
    {
      img: "/second.png",
      text: "Join the TNC ICO and be part of a groundbreaking platform that merges blockchain with professional growth. Help fund and benefit from a project aimed at revolutionizing knowledge sharing in the tech industry.",
      alt: "Why Join Our ICO?",
    },
    {
      img: "/third.png",
      text: "Participating in the TNC ICO is simple: create an account, connect your wallet, and purchase tokens. Secure your stake in a community-driven project that prioritizes innovation and rewards.",
      alt: "How to Partcipate",
    },
    {
      img: "/fourth.png",
      text: "Stake your TNC tokens on our platform and earn attractive APY while contributing to the platform’s stability. Enjoy exclusive perks, governance rights, and enhanced access to premium features.",
      alt: "Staking and Rewards",
    },
  ];
  return (
    <section className="pl-24 pr-24 pt-28 pb-28 flex items-center justify-center bg-blue-600 h-auto">
      <div className="flex flex-col md:flex-row gap-10">
        {infos.map((info, index) => (
          <div key={index} className="flex flex-col gap-5">
            <div className="w-[250px] h-[270px]">
              <Image alt={info.alt} src={info.img} width={250} height={270} />
            </div>
            <p className=" text-balance  text-justify">{info.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
