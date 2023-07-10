import { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'

import { useMintMetadata } from './useMintMetadata'

export const useMintSymbol = (mint: PublicKey | undefined) => {
  const isSol = mint?.toString() === PublicKey.default.toString()
  const mintMetadata = useMintMetadata(mint)

  return useQuery<string | undefined>(
    ['useRewardMintSymbol', mint?.toString()],
    async () => {
      if (!mint) return
      if (isSol) return 'SOL'
      if (mintMetadata.data) {
        return mintMetadata.data.data.symbol.replace(/\0/g, '')
      }
      return '??'
    },
    {
      enabled: mintMetadata.isFetched && !!mint,
    }
  )
}
