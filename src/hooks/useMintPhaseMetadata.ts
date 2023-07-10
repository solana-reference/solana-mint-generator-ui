import { useQuery } from '@tanstack/react-query'

import { useMintConfig } from './useMintConfig'

export type MintPhaseMetadata = {
  title?: string
  subtitle?: string
  description?: string
}

export const useMintPhaseMetadata = (phaseIx: number) => {
  const { data: mintConfig } = useMintConfig()
  return useQuery(
    ['useMintPhaseMetadata', phaseIx],
    async () => {
      if (!mintConfig) return
      return JSON.parse(
        mintConfig.parsed.mintPhases[phaseIx].metadata
      ) as MintPhaseMetadata
    },
    {
      enabled: !!mintConfig,
    }
  )
}
