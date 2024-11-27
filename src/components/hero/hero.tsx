import CryptoPay from "./cryptoPay";
import Text from "./text";

export default function Hero() {
  return (
    <section className="md:h-[500px] w-full flex flex-col md:flex-row gap-10 md:p-5">
      <div className="w-full md:w-1/2 md:pl-10 md:pr-10">
        <Text />
      </div>
      <div className="w-full flex items-center justify-center md:w-1/2 md:pl-10 md:pr-10">
        {" "}
        <CryptoPay />
      </div>
    </section>
  );
}
