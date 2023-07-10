import { css } from '@emotion/react'
import { useMintConfig } from '@/hooks/useMintConfig'
import { useUTCNow } from '@/providers/UTCNowProvider'
import { useMintConfigMetadata } from '@/hooks/useMintConfigMetadata'

export const MintSupply = () => {
  const mintConfig = useMintConfig()
  const mintConfigMetadata = useMintConfigMetadata()
  const { UTCNow } = useUTCNow()
  const pct =
    Number(mintConfig.data?.parsed.count) /
    Number(mintConfig.data?.parsed.supply)
  return (
    <div className="relative h-8 w-full overflow-hidden rounded-xl bg-white bg-opacity-10">
      <div
        className="absolute h-full bg-primary"
        css={css`
          width: ${pct * 100}%;
        `}
      />
      <div className="absolute flex h-full w-full items-center justify-center gap-2 text-sm">
        <div>{mintConfig.data?.parsed.count.toString() ?? 0}</div>
        <div>/</div>
        {mintConfigMetadata.data?.supply ??
          (mintConfig.data ? (
            mintConfig.data?.parsed.supply.toString()
          ) : (
            <div className="h-2/3 w-8 animate-pulse rounded-lg bg-border"></div>
          ))}
      </div>
      <div className="absolute right-5 flex h-full items-center text-sm">
        <div className="h-2 w-2 animate-ping rounded-full bg-light-0" />
      </div>
    </div>
  )
}
