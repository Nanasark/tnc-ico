import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";

import { League_Spartan } from "next/font/google";
import { IoMdMenu } from "react-icons/io";
import { createWallet } from "thirdweb/wallets";
import { chain } from "@/app/chain";

const league_spartan = League_Spartan({ subsets: ["latin"] });

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.trustwallet.app"),
  ];

  const navLinks = [
    { url: "#", name: "Communities" },
    { url: "#", name: "Events" },
    { url: "#", name: "Jobs" },
    { url: "#", name: "About" },
    { url: "#", name: "Stake" },
  ];

  return (
    <header className="z-50 text-blue-600 h-[60px] bg-white flex place-content-center justify-between content-center text-center px-4 w-full">
      <Image
        className="ml-16"
        src="/logo.png"
        width={200}
        height={45}
        alt="logo"
      />

      {/* Menu Icon for Mobile */}
      <div className="lg:hidden flex items-center">
        <IoMdMenu
          className="w-8 h-8 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Desktop Nav Links */}
      <nav className="hidden lg:mr-10 lg:gap-28 lg:flex gap-5 items-center">
        <div className="lg:flex gap-5">
          {navLinks.map((link, index) => (
            <Link
              href={link.url}
              key={index}
              className=" font-bold hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <ConnectButton
          client={client}
          chain={chain}
          supportedTokens={{
            56: [
              {
                name: "TECHS NETWORK TOKEN",
                address: "0x170b47f039d006396929F7734228fFc53Ab155b2",
                symbol: "TNC",
              },
            ],
          }}
          theme={"light"}
          wallets={wallets}
          showAllWallets={false}
          connectButton={{
            className: "connect",
            label: "Sign in",
          }}
        />
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className=" absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-4 lg:hidden">
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
            chain={chain}
            supportedTokens={{
              56: [
                {
                  name: "TECHS NETWORK TOKEN",
                  address: "0x170b47f039d006396929F7734228fFc53Ab155b2",
                  symbol: "TNC",
                },
              ],
            }}
            theme={"light"}
            wallets={wallets}
            showAllWallets={false}
            connectButton={{
              className: "connect",
              label: "Sign in",
            }}
          />
        </nav>
      )}
    </header>
  );
}
