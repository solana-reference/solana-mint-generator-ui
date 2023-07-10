import type { PublicKey } from '@solana/web3.js'
import { useQuery } from 'react-query'

export type PaymentMintInfo = {
  mint: string
  symbol: string
  image?: string
  decimals: number
}

export const mintSymbol = (paymentMint: PublicKey | null | undefined) => {
  const symbol = PAYMENT_MINTS.find(
    (mint) => mint.mint === paymentMint?.toString()
  )?.symbol
  if (!symbol || symbol === 'SOL') {
    return '◎'
  } else {
    return symbol
  }
}

// fallback to wSOL
export const mintDecimals = (paymentMint: PublicKey | null | undefined) => {
  return (
    PAYMENT_MINTS.find((mint) => mint.mint === paymentMint?.toString())
      ?.decimals ?? PAYMENT_MINTS[0]!.decimals
  )
}

export const mintImage = (paymentMint: PublicKey | null | undefined) => {
  return PAYMENT_MINTS.find((mint) => mint.mint === paymentMint?.toString())
    ?.image
}

export const PAYMENT_MINTS: PaymentMintInfo[] = [
  {
    mint: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    decimals: 9,
  },
  {
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    image:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    decimals: 6,
  },
  {
    mint: 'tttvgrrNcjVZJS33UAcwTNs46pAidgsAgJqGfYGdZtG',
    symbol: 'TEST',
    decimals: 7,
  },
]

export const usePaymentMints = () => {
  return useQuery<{
    [name: string]: PaymentMintInfo
  }>(
    ['usePaymentMints'],
    async () => {
      return Object.fromEntries(PAYMENT_MINTS.map((data) => [data.mint, data]))
    },
    {
      refetchOnMount: false,
    }
  )
}
