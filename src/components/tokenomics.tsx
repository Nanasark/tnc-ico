import Image from "next/image";

export default function Tokenomics() {
  const tokenomics = [
    {
      title: "Category",
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
    <div className="w-full h-auto p-10 bg-blue-600 overflow-x-auto content-center text-cneter">
      <h1 className="text-white font-bold text-[36px] text-center">Introduction To The $TNC Tokenism</h1>
      <table
        border={1}
        className="bg-blue-600 w-full text-white border-collapse"
      >
        <thead>
          <tr>
            {tokenomics.map((tokens, index) => (
              <th key={index} className="border px-4 py-2 text-left">
                {tokens.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tokenomics[0].content.map((_, rowIndex) => (
            <tr key={rowIndex}>
              {tokenomics.map((tokens, colIndex) => (
                <td key={colIndex} className="border px-4 py-2 text-left">
                  {tokens.content[rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
