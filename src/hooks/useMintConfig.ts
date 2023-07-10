import { useQuery } from '@tanstack/react-query'
import { useEnvironmentCtx } from '@/providers/EnvironmentProvider'

import { fetchIdlAccount } from '@/sdk'
import { useMintConfigId } from './useMintConfigId'

export const useMintConfig = () => {
  const mintConfigId = useMintConfigId()
  const { connection } = useEnvironmentCtx()
  return useQuery(
    ['useMintConfig', mintConfigId?.toString()],
    async () => {
      if (!mintConfigId) return
      return fetchIdlAccount(connection, mintConfigId, 'mintConfig')
    },
    {
      enabled: !!mintConfigId,
      refetchInterval: 1000,
    }
  )
}
