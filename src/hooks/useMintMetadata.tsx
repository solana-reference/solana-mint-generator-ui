import { useEnvironmentCtx } from '@/providers/EnvironmentProvider'
import { Metadata } from '@metaplex-foundation/mpl-token-metadata'
import { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'

export const useMintMetadata = (mint: PublicKey | undefined) => {
  const { connection } = useEnvironmentCtx()
  return useQuery(
    ['useMintMetadata', mint?.toString()],
    async () => {
      if (!mint) return null
      if (mint.equals(PublicKey.default)) return null
      const metadata = await Metadata.fromAccountAddress(connection, mint)
      return metadata
    },
    {
      enabled: !!mint,
    }
  )
}
