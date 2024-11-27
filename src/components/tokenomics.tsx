import Image from "next/image";
export default function Tokenomics() {
  return (
    <div className="w-full">
      <Image
        alt="tokenomics sales"
        src="/sale.png"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
