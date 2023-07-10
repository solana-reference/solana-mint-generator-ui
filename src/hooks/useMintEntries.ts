import { useQuery } from '@tanstack/react-query'

import { useMintConfig } from './useMintConfig'
import { MAX_NAME_LENGTH, MAX_SYMBOL_LENGTH, MINT_ENTRY_SIZE } from '@/sdk'
import { utils } from '@coral-xyz/anchor'

const STRING_PREFIX_LENGTH = 4
export const useMintEntries = () => {
  const { data: mintConfig } = useMintConfig()
  return useQuery(
    ['useMintEntries', mintConfig?.data?.length],
    async () => {
      if (!mintConfig) return
      const remainingTokens = mintConfig.parsed.supply
        .sub(mintConfig.parsed.count)
        .toNumber()
      const mintEntryBytes = mintConfig?.data.slice(
        mintConfig.data.length - MINT_ENTRY_SIZE * remainingTokens
      )
      const mintEntries: { name: string; uri: string; symbol: string }[] = []
      for (let i = 0; i < remainingTokens; i++) {
        try {
          const startOffset = i * MINT_ENTRY_SIZE
          const configLineBytes = mintEntryBytes?.slice(
            startOffset,
            startOffset + MINT_ENTRY_SIZE
          )

          const name = utils.bytes.utf8
            .decode(
              configLineBytes.slice(STRING_PREFIX_LENGTH, MAX_NAME_LENGTH)
            )
            .replace(/\0/g, '')
          const symbol = utils.bytes.utf8
            .decode(
              configLineBytes.slice(
                STRING_PREFIX_LENGTH + MAX_NAME_LENGTH,
                MAX_NAME_LENGTH + MAX_SYMBOL_LENGTH
              )
            )
            .replace(/\0/g, '')
          const uri = utils.bytes.utf8
            .decode(
              configLineBytes.slice(
                STRING_PREFIX_LENGTH + MAX_NAME_LENGTH + MAX_SYMBOL_LENGTH
              )
            )
            .replace(/\0/g, '')

          mintEntries.push({ name, uri, symbol })
        } catch (e) {}
      }
      return mintEntries
    },
    {
      enabled: !!mintConfig,
    }
  )
}
