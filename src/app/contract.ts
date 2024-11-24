import { getContract } from "thirdweb";
import { Variables } from "./strings";
import { chain } from "./chain";
import { client } from "./client";
import { ICOABI } from "./abi";
import { polygonAmoy } from "thirdweb/chains";

export const tokenContract = getContract({
  address: Variables.TokenAddress,
  chain: polygonAmoy,
  client: client,
  abi: ICOABI,
});
