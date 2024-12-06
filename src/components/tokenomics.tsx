import Image from "next/image";
export default function Tokenomics() {
  const tokenomics = [
    {
      title: "category",
      content: [
        "Community & Rewards",
        "Ecosystem Development",
        "Team & Advisors",
        "Public ICO Sale",
        "Private Sale & Seed Funding",
        "Marketing & Partnerships",
        "Reserve Fund",
      ],
    },

    {
      title: "Percentage",
      content: ["40%", "20%", "15%", "5%", "10%", "5%", "5%"],
    },

    {
      title: "Amount",
      content: [
        "80,000,000",
        "40,000,000",
        "30,000,000",
        "10,000,000",
        "20,000,000",
        "10,000,000",
        "10,000,000",
      ],
    },
  ];

  return (
    <div className="w-full h-[600px] p-10">
      <table className=" bg-blue-600 w-full h-full">
        <thead>
          <tr>
            {tokenomics.map((tokens, index) => (
              <th key={index}> {tokens?.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>{tokenomics[0].content.map((cont, index) => <td key={index}>
            {cont}
          </td>)}</tr>
        </tbody>
      </table>
    </div>
  );
}


 {/* <Image
        alt="tokenomics sales"
        src="/sale.png"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      /> */}