import Image from "next/image";
import { IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io";

export default function Footer() {
  const sections = [
    {
      category: "techsnetwork",
      items: [
        { name: "communities", url: "/communities" },
        { name: "Jobs", url: "/jobs" },
        { name: "blog", url: "/blog" },
      ],
    },
    {
      category: "community",
      items: [
        { name: "events", url: "/events" },
        { name: "campaign", url: "/campaign" },
        { name: "advertising", url: "/advertising" },
      ],
    },
    {
      category: "company",
      items: [
        { name: "about", url: "/about" },
        { name: "legal", url: "/legal" },
        { name: "contact us", url: "/contact" },
      ],
    },
    {
      category: "terms",
      items: [
        { name: "terms of use", url: "/terms" },
        { name: "privacy policy", url: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-black p-5 pl-10 pr-10 text-white w-full">
      <section className="flex flex-col  items-center gap-10 md:flex-row">
        <div className="flex md:w-2/6  flex-col gap-3">
          <div className="">
            <Image alt="" src="/logo.png" width={250} height={50} />
          </div>
          <div>
            techs network is the biggest community of developers, investors and
            tech evangalists. Join to level up your game.
          </div>
          <div className="flex gap-5">
            <IoLogoFacebook />
            <IoLogoTwitter />
            <IoLogoLinkedin />
          </div>
        </div>
        <div className="w-5/6 grid gap-[10px]  grid-cols-2 md:grid-cols-4">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="text-blue-900">{section.category}</h3>
              <div className="flex flex-col">
                {section.items.map((item, index) => (
                  <a key={index} href="#">
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <br></br>
      <hr />
      <section className="content-center items-center flex gap-2">
        <span> &copy;</span>
        <p className="text-center">techs network, 2024. All rights reserved.</p>
      </section>
    </footer>
  );
}
