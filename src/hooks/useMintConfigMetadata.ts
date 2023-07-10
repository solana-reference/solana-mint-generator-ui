import { useQuery } from '@tanstack/react-query'

import { useMintConfig } from './useMintConfig'
import type { IconKey } from '@/common/Socials'

export type Colors = {
  accent?: string
  glow?: string
}

export type MintConfigMetadata = {
  headerImage?: string
  displayName?: string
  description?: string
  previewUrl?: string
  marketplaceUrl?: string
  supply?: number
  socials?: {
    icon: IconKey
    link: string
  }[]
  colors?: Colors
}

export const useMintConfigMetadata = () => {
  const { data: mintConfig } = useMintConfig()
  return useQuery(
    ['useMintConfigMetadata', mintConfig?.data?.length],
    async () => {
      if (!mintConfig) return
      return JSON.parse(mintConfig.parsed.metadata) as MintConfigMetadata
    },
    {
      enabled: !!mintConfig,
    }
  )
}
