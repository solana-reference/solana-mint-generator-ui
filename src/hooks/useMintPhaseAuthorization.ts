import type { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useEnvironmentCtx } from '@/providers/EnvironmentProvider'

import { useWalletId } from './useWalletId'
import { fetchIdlAccountNullable, findMintPhaseAuthorizationId } from '@/sdk'

export const useMintPhaseAuthorization = (
  mintConfigId: PublicKey | undefined,
  phaseIx: number | null
) => {
  const walletId = useWalletId()
  const { connection } = useEnvironmentCtx()
  return useQuery(
    [
      'useMintPhaseAuthorization',
      mintConfigId?.toString(),
      phaseIx,
      walletId?.toString(),
    ],
    async () => {
      if (!mintConfigId) throw 'No mint config'
      if (!walletId || phaseIx === null) return null
      return fetchIdlAccountNullable(
        connection,
        findMintPhaseAuthorizationId(mintConfigId, phaseIx, walletId),
        'mintPhaseAuthorization'
      )
    },
    {
      enabled: !!mintConfigId,
    }
  )
}
