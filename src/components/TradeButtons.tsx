import { MagicEden } from '@/assets/MagicEden'
import { ButtonSmall } from '@/common/ButtonSmall'
import { useMintConfigMetadata } from '@/hooks/useMintConfigMetadata'

export const TradeButtons = () => {
  const mintConfigMetadata = useMintConfigMetadata()
  return (
    <div className="flex w-full flex-col gap-1">
      <ButtonSmall
        onClick={() =>
          window.open(
            mintConfigMetadata.data?.marketplaceUrl ??
              `https://magiceden.io/me`,
            '_blank'
          )
        }
        className="flex w-full items-center"
      >
        <div className="mr-1 text-lg">Trade</div>
        <MagicEden className="h-5" />
      </ButtonSmall>
    </div>
  )
}
