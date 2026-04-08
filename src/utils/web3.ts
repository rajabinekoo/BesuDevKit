import { Web3 } from "web3";
import config from "../config";

export const web3 = new Web3(config.rpcAddress);

export async function transferEth(
  from: string,
  to: string,
  amountInEth: bigint | number | string,
) {
  const amountInWei = web3.utils.toWei(amountInEth.toString(), "ether");
  return await web3.eth.sendTransaction({
    to: to,
    from: from,
    value: amountInWei,
  });
}
