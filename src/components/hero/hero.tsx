import CryptoPay from "./cryptoPay";
import Text from "./text";

export default function Hero() {
  return (
    <section className="h-full  w-full flex flex-col md:flex-row gap-10 lg:gap-5 md:p-5">
      <div className="w-full h-full md:w-1/2 lg:w-full md:pl-10 md:pr-10 ">
        <Text />
      </div>
      <div className="w-full flex items-center justify-center md:w-1/2 md:pl-10 lg:pl-5 lg:pr-5 md:pr-10 ">
        {" "}
        <CryptoPay />
      </div>
      {/* <h1 className="w-full h-[30px] bg-blue-600 content-center font-bold text-[12px] md:text-[24px] text-center  text-white">
        BUY THE $TNC BEFORE THE PRICE INCREASES
      </h1> */}
    </section>
  );
}
