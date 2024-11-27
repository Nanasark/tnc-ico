import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";
import { polygonAmoy } from "thirdweb/chains";
import { League_Spartan } from "next/font/google";
import { IoMdMenu } from "react-icons/io";

const league_spartan = League_Spartan({ subsets: ["latin"] });

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility

  const navLinks = [
    { url: "#", name: "Communities" },
    { url: "#", name: "Events" },
    { url: "#", name: "Jobs" },
    { url: "#", name: "About" },
    { url: "#", name: "Stake" },
  ];

  return (
    <header className="text-blue-600 h-[60px] bg-white flex items-center justify-between px-4 w-full">
      <Image src="/logo.png" width={120} height={40} alt="logo" />

      {/* Menu Icon for Mobile */}
      <div className="lg:hidden flex items-center">
        <IoMdMenu
          className="w-8 h-8 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Desktop Nav Links */}
      <nav className="hidden lg:flex gap-5 items-center">
        {navLinks.map((link, index) => (
          <Link href={link.url} key={index} className="hover:underline">
            {link.name}
          </Link>
        ))}
        <ConnectButton
          client={client}
          chain={polygonAmoy}
          supportedTokens={{
            80002: [
              {
                name: "testtnc",
                address: "0xab0DB6DEF25D74861897fcaE248a75c5D8D19C34",
                symbol: "ttnc",
              },
            ],
          }}
        />
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-4 lg:hidden">
          {navLinks.map((link, index) => (
            <Link
              href={link.url}
              key={index}
              className="hover:underline text-blue-600"
              onClick={() => setMenuOpen(false)} // Close menu after click
            >
              {link.name}
            </Link>
          ))}
          <ConnectButton
            client={client}
            chain={polygonAmoy}
            supportedTokens={{
              80002: [
                {
                  name: "testtnc",
                  address: "0xab0DB6DEF25D74861897fcaE248a75c5D8D19C34",
                  symbol: "ttnc",
                },
              ],
            }}
          />
        </nav>
      )}
    </header>
  );
}
