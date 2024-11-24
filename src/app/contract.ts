import { getContract } from "thirdweb";
import { Variables } from "./strings";
import { chain } from "./chain";
import { client } from "./client";
import { ICOABI } from "./abi";
import { polygonAmoy } from "thirdweb/chains";

export const contractIco = getContract({
  address: Variables.IcoAddress,
  chain: polygonAmoy,
  client: client,
  abi: ICOABI,
});
