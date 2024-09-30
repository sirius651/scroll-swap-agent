import ERC20Abi from "../abi/ERC20MockAbi.json";
import Web3 from "web3";
import { BigNumber } from "ethers";
import { Alchemy, Utils, Network } from 'alchemy-sdk';

export const CONFIG_CONTRACT = {
  // Each token is configured with its ERC20 contract address and Pyth Price Feed ID.
  // You can find the list of price feed ids at https://pyth.network/developers/price-feed-ids
  baseToken: {
    name: "mWETH",
    erc20Address: "0x66C9E6aAa33347451aEeA79ba5716dDA23E1D26C",
    pythPriceFeedId:
      "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    decimals: 18,
  },
  quoteToken: {
    name: "mSOL",
    erc20Address: "0x39Df427D082bd47af93F3d8DED3F2F630d9fCBCA",
    pythPriceFeedId:
      "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
    decimals: 18,
  },
  swapContractAddress: "0x88818cE3F6e39c9E2bBfbDe005e4484838847e92",
  pythContractAddress: "0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c",
  hermesUrl: "https://hermes.pyth.network",
  mintQty: 10,
};

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const settings = {
  apiKey: apiKey,
  network: Network.SCROLL_SEPOLIA,
};

const alchemy = new Alchemy(settings);

/**
 * Allow `approvedSpender` to spend your
 * @param web3
 * @param erc20Address
 * @param sender
 * @param approvedSpender
 */
export async function approveToken(
  web3: Web3,
  erc20Address: string,
  sender: string,
  approvedSpender: string
) {
  const erc20 = new web3.eth.Contract(ERC20Abi as any, erc20Address);

  await erc20.methods
    .approve(approvedSpender, BigNumber.from("2").pow(256).sub(1))
    .send({ from: sender });
}

export async function getApprovedQuantity(
  web3: Web3,
  erc20Address: string,
  sender: string,
  approvedSpender: string
): Promise<BigNumber> {
  const erc20 = new web3.eth.Contract(ERC20Abi as any, erc20Address);
  let allowance = BigNumber.from(
    await erc20.methods.allowance(sender, approvedSpender).call()
  );
  return allowance as BigNumber;
}

// export async function getBalance(
//   web3: Web3,
//   erc20Address: string,
//   address: string
// ): Promise<BigNumber> {
//   const erc20 = new web3.eth.Contract(ERC20Abi as any, erc20Address);
//   return BigNumber.from(await erc20.methods.balanceOf(address).call());
// }


export async function getBalance(ownerAddress: string, erc20Address: string,): Promise<BigNumber> {
  const tokenContractAddresses = [erc20Address];

  const data = await alchemy.core.getTokenBalances(
    ownerAddress,
    tokenContractAddresses
  );
  return BigNumber.from(data.tokenBalances[0].tokenBalance);
}

export async function getEthBalance(address: string): Promise<BigNumber> {
  // Get balance and format in terms of ETH
  let balance = await alchemy.core.getBalance(address, 'latest');
  return balance
}

export async function mint(
  web3: Web3,
  sender: string,
  erc20Address: string,
  destinationAddress: string,
  quantity: BigNumber
) {
  const erc20 = new web3.eth.Contract(ERC20Abi as any, erc20Address);
  const receipt = await erc20.methods.mint(destinationAddress, quantity).send({ from: sender });
  return receipt;
}
