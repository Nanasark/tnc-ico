import { getContract } from "thirdweb";
import { Variables } from "./strings";
import { chain } from "./chain";
import { client } from "./client";
import { ICOABI } from "./abi";


export const contractIco = getContract({
  address: Variables.IcoAddress,
  chain: chain,
  client: client,
  abi: ICOABI,
});
