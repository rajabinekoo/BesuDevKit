import { Web3 } from "web3";

export const web3 = new Web3("http://192.168.1.6:8545");

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
