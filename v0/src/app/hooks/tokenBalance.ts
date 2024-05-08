import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";
import { useQuery } from "@tanstack/react-query";
import { config } from "@/wagmi";
import { ERC20_ABI } from "../abi/abi";
import { BigNumberish, ethers } from "ethers";
import { useEffect, useState } from "react";

export function useTokenBalance() {
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const account = useAccount();

  useEffect(() => {
    const init = async () => {
      const { balance, decimals } = await fetchTokenBalance();
      const balanceInEth = ethers.utils.formatUnits(balance, decimals);
      setTokenBalance(parseFloat(balanceInEth));
    }

    account.address && init();
  }, [account.address])

  const fetchTokenBalance = async (): Promise<{ balance: BigNumberish, decimals: any }> => {
    const [balance, decimals] = await Promise.all<BigNumberish[] | any>([
      readContract(config, {
        address: process.env.NEXT_PUBLIC_COIN_CONTRACT_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [account.address]
      }),
      readContract(config, {
        address: process.env.NEXT_PUBLIC_COIN_CONTRACT_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals'
      })
    ]);

    return {
      balance,
      decimals
    };
  }

  return tokenBalance;
}