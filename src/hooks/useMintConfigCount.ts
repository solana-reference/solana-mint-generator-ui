import { useQuery } from '@tanstack/react-query'
import { useEnvironmentCtx } from '@/providers/EnvironmentProvider'

import { getProgramIdlAccounts } from '@/sdk'

export const useMintConfigCount = () => {
  const { connection } = useEnvironmentCtx()
  return useQuery(['useMintConfigCount'], async () => {
    const programAccounts = await getProgramIdlAccounts(
      connection,
      'mintConfig',
      { dataSlice: { offset: 0, length: 0 } }
    )
    return programAccounts.length
  })
}
