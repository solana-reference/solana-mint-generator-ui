import { useMintInfo } from '@/hooks/useMintInfo'
import { useMintSymbol } from '@/hooks/useMintSymbol'
import { decimalAmount } from '@cardinal/common'
import type { BN } from '@coral-xyz/anchor'
import type { PublicKey } from '@solana/web3.js'

export const MintPhaseTokenPayment = ({
  mint,
  amount,
}: {
  mint: PublicKey
  amount: BN
}) => {
  const mintSymbol = useMintSymbol(mint)
  const mintInfo = useMintInfo(mint)
  return (
    <div className="flex items-center gap-1 text-base font-bold">
      {!mintInfo.data ? (
        <div className="h-6 w-10 animate-pulse rounded-md bg-border" />
      ) : (
        <div>{decimalAmount(amount, mintInfo.data?.decimals).toFixed(2)}</div>
      )}
      {!mintSymbol.data ? (
        <div className="h-6 w-6 animate-pulse rounded-md bg-border" />
      ) : (
        <div>{mintSymbol.data}</div>
      )}
    </div>
  )
}
