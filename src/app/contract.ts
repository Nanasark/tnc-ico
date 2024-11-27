import { getContract } from "thirdweb";
import { Variables } from "./strings";
import { chain } from "./chain";
import { client } from "./client";
import { ICOABI } from "./abi";
import { polygonAmoy } from "thirdweb/chains";

<<<<<<< HEAD
export const contractIco = getContract({
  address: Variables.IcoAddress,
=======
export const tokenContract = getContract({
  address: Variables.TokenAddress,
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
  chain: polygonAmoy,
  client: client,
  abi: ICOABI,
});
