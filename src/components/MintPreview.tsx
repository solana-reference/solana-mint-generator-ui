import { useMintConfig } from '@/hooks/useMintConfig'
import { useMintConfigMetadata } from '@/hooks/useMintConfigMetadata'
import { useMintEntriesMetadata } from '@/hooks/useMintEntriesMetadata'
import { useUTCNow } from '@/providers/UTCNowProvider'
import { useEffect, useState } from 'react'
import { BsFillRocketFill } from 'react-icons/bs'

export const MintPreview = () => {
  const { UTCNow } = useUTCNow()
  const mintConfig = useMintConfig()
  const mintConfigMetadata = useMintConfigMetadata()
  const mintEntriesMetadata = useMintEntriesMetadata()
  const mintImages =
    mintEntriesMetadata.data && mintEntriesMetadata.data.length > 0
      ? mintEntriesMetadata.data.map((m) => m.image)
      : null
  const [[imageUrl], setImageUrl] = useState<[string | undefined, number]>([
    undefined,
    0,
  ])

  useEffect(() => {
    mintEntriesMetadata.isFetched &&
      setImageUrl(([_, c]) => {
        let next = c + 1
        if (mintImages && c >= mintImages?.length - 1) next = 0
        return [
          mintImages
            ? mintImages[next]
            : `https://picsum.photos/600/600?q=${next}`,
          next,
        ]
      })
  }, [mintEntriesMetadata.isFetched, UTCNow])

  return (
    <div className="aspect-square w-full">
      {mintConfigMetadata.data?.previewUrl ? (
        <img
          src={mintConfigMetadata.data?.previewUrl}
          alt="Mint preview"
          className="w-full rounded-lg"
        />
      ) : mintConfig.data?.parsed.count.eq(mintConfig.data.parsed.supply) ? (
        <div className="flex h-full flex-col items-center justify-center gap-6 rounded-lg bg-border text-5xl">
          <BsFillRocketFill className="text-[120px]" />
          SOLD OUT
        </div>
      ) : mintEntriesMetadata.isFetched ? (
        <img src={imageUrl} alt="Mint preview" className="w-full rounded-lg" />
      ) : (
        <div className="aspect-square animate-pulse rounded-lg bg-border"></div>
      )}
    </div>
  )
}
