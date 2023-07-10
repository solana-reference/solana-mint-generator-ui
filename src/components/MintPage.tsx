import { useEffect, useState } from 'react'
import { MintButton } from './MintButton'
import { MintInfo } from './MintInfo'
import { MintPhase, phaseActive } from './MintPhase'
import { MintPreview } from './MintPreview'
import { MintSupply } from './MintSupply'
import { TradeButtons } from './TradeButtons'
import { useMintConfig } from '@/hooks/useMintConfig'
import { useUTCNow } from '@/providers/UTCNowProvider'

export const MintPage = () => {
  const [phaseIx, setPhaseIx] = useState<number | null>(null)
  const { data: mintConfig } = useMintConfig()
  const { UTCNow } = useUTCNow()

  useEffect(() => {
    if (mintConfig?.parsed.mintPhases) {
      const ix = mintConfig?.parsed.mintPhases.findIndex((p) =>
        phaseActive(mintConfig, p, UTCNow)
      )
      ix >= 0 && setPhaseIx(ix)
    }
  }, [mintConfig?.pubkey.toString(), UTCNow])

  return (
    <div className="mx-auto mt-16 flex w-full max-w-[1300px] flex-wrap gap-10 px-10">
      <div className="flex w-full flex-wrap gap-10">
        <div className="flex flex-1 flex-col gap-6">
          <MintInfo />
          <div className="flex flex-1 flex-col gap-4">
            {mintConfig?.parsed.mintPhases &&
              mintConfig.parsed.mintPhases.map((p, i) => (
                <MintPhase
                  key={i}
                  phase={p}
                  phaseIx={i}
                  selected={phaseIx === i}
                />
              ))}
          </div>
        </div>
        <div className="flex min-w-[300px] flex-1 flex-col items-center gap-4">
          <MintPreview />
          <MintSupply />
          <MintButton
            phaseIx={phaseIx}
            phase={
              phaseIx !== null
                ? mintConfig?.parsed.mintPhases[phaseIx] ?? null
                : null
            }
          />
          <TradeButtons />
        </div>
      </div>
    </div>
  )
}
