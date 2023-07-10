import { useQuery } from '@tanstack/react-query'

import { useMintEntries } from './useMintEntries'

const MINT_ENTRIES_IMAGE_LENGTH = 10

export type Metadata = {
  image: string
}

export const useMintEntriesMetadata = () => {
  const mintEntries = useMintEntries()
  return useQuery(
    ['useMintEntriesMetadata', mintEntries],
    async () => {
      if (!mintEntries.data) return null
      const randomStart = Math.max(
        0,
        Math.floor(
          Math.random() * mintEntries.data.length -
            (MINT_ENTRIES_IMAGE_LENGTH + 1)
        )
      )
      const uris = mintEntries.data.slice(
        randomStart,
        randomStart + MINT_ENTRIES_IMAGE_LENGTH
      )
      const uniqueUris = Object.keys(
        uris.reduce((acc, { uri }) => {
          if (uri in acc) return acc
          acc[uri] = true
          return acc
        }, {} as { [s: string]: boolean })
      )
      const metadata = await Promise.all(
        uniqueUris?.map(async (uri) => {
          try {
            const json = await fetch(uri).then((r) => r.json())
            return json as Metadata
          } catch (e) {
            return null
          }
        })
      )
      return metadata
        .filter((md): md is Metadata => !!md)
        .sort(() => 0.5 - Math.random())
    },
    {
      enabled: mintEntries.isFetched,
    }
  )
}
