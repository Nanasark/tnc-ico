import CryptoPay from "./cryptoPay";
import Text from "./text";

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <Text />
      <CryptoPay />
    </div>
  );
}
