import { getExpirationString, pubKeyUrl } from '@cardinal/common'
import { BN } from '@coral-xyz/anchor'
import { Tooltip } from '@/common/Tooltip'
import { useMintConfig } from '@/hooks/useMintConfig'
import { useUTCNow } from '@/providers/UTCNowProvider'
import { AiFillCrown, AiOutlineCompress } from 'react-icons/ai'

import { MintPhaseAuthorizationStatus } from './MintPhaseAuthorizationStatus'
import type { IdlAccountData } from '@/sdk'
import { useMintPhaseMetadata } from '@/hooks/useMintPhaseMetadata'
import { MintPhaseTokenPayment } from './MintPhaseTokenPayment'
import { MintPhaseCollectionCheck } from './MintPhaseCollectionCheck'
import { twMerge } from 'tailwind-merge'
import { useEnvironmentCtx } from '@/providers/EnvironmentProvider'

export const conditionActive = (
  mintConfig: IdlAccountData<'mintConfig'> | undefined,
  condition: IdlAccountData<'mintConfig'>['parsed']['mintPhases'][0]['startCondition'],
  UTCNow: number
) => {
  return (
    (condition?.count && mintConfig?.parsed.count.gt(condition?.count)) ||
    (condition?.timeSeconds && UTCNow > condition.timeSeconds.toNumber())
  )
}

export const phaseActive = (
  mintConfig: IdlAccountData<'mintConfig'> | undefined,
  phase: IdlAccountData<'mintConfig'>['parsed']['mintPhases'][0],
  UTCNow: number
) => {
  return (
    (!phase.startCondition ||
      conditionActive(mintConfig, phase.startCondition, UTCNow)) &&
    !conditionActive(mintConfig, phase.endCondition, UTCNow)
  )
}

export const MintPhase = ({
  selected,
  phaseIx,
  phase,
}: {
  phaseIx: number
  selected: boolean
  phase: IdlAccountData<'mintConfig'>['parsed']['mintPhases'][0]
}) => {
  const { environment } = useEnvironmentCtx()
  const { UTCNow } = useUTCNow()
  const mintConfig = useMintConfig()
  const mintPhaseMetadata = useMintPhaseMetadata(phaseIx)
  const isStarted =
    !phase.startCondition ||
    conditionActive(mintConfig.data, phase.startCondition, UTCNow)
  const isEnded = conditionActive(mintConfig.data, phase.endCondition, UTCNow)
  const live = isStarted && !isEnded
  return (
    <div
      className={twMerge([
        `w-full cursor-pointer rounded-lg border-opacity-50 bg-light-4 bg-opacity-20 px-6 py-4 text-sm`,
        live ? 'border-2 border-border' : 'border border-border opacity-50',
        selected && 'border-primary',
      ])}
    >
      <div className="mb-2 flex justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-base font-bold">
            {mintPhaseMetadata.data?.title ?? `Phase ${phaseIx + 1}`}
          </div>
          <div className="text-light-2">{mintPhaseMetadata.data?.subtitle}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-base font-bold">
            {isEnded ? (
              <div className="text-red-500">Ended</div>
            ) : isStarted ? (
              <div className="flex gap-2 text-green-500">
                {phase.endCondition?.timeSeconds && (
                  <div>
                    {getExpirationString(
                      phase.endCondition?.timeSeconds.toNumber(),
                      UTCNow,
                      {
                        showZeros: true,
                        capitalizeSuffix: false,
                      }
                    )}
                  </div>
                )}
                {phase.endCondition?.count && (
                  <div>
                    {phase.endCondition?.count
                      .sub(mintConfig.data?.parsed.count ?? new BN(0))
                      .toNumber()}{' '}
                    Remaining
                  </div>
                )}
                {!phase.endCondition && <div>LIVE</div>}
              </div>
            ) : (
              <div className="flex gap-2">
                {phase.startCondition?.timeSeconds && (
                  <div>
                    {getExpirationString(
                      phase.startCondition?.timeSeconds.toNumber(),
                      UTCNow,
                      {
                        showZeros: true,
                        capitalizeSuffix: false,
                      }
                    )}
                  </div>
                )}
                {phase.startCondition?.count && (
                  <div>
                    {phase.startCondition?.count
                      .sub(mintConfig.data?.parsed.count ?? new BN(0))
                      .toNumber()}{' '}
                    Until Start
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="text-light-2">
            {mintPhaseMetadata.data?.description}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <MintPhaseAuthorizationStatus
            mintPhase={phase}
            mintPhaseIx={phaseIx}
          />
          {phase.tokenChecks
            .filter((c) => !c.addressKind.mint)
            .map((c, i) => (
              <MintPhaseCollectionCheck key={i} tokenCheck={c} />
            ))}
          {mintConfig.data?.parsed.outputMintConfig.tokenStandard
            .programmableNonFungible && (
            <Tooltip
              label="Royalties are enforced for these tokens. Click here to learn more"
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1 rounded-lg border border-yellow-500 bg-yellow-500 bg-opacity-20 px-3 py-1 text-xs">
                <AiFillCrown /> Royalty Enabled
              </div>
            </Tooltip>
          )}
          {mintConfig.data?.parsed.outputMintConfig.merkleTree && (
            <Tooltip
              label={`Minted tokens will be compressed NFTs. Click here to learn more`}
              className="cursor-pointer"
            >
              <a
                href={pubKeyUrl(
                  mintConfig.data?.parsed.outputMintConfig.merkleTree,
                  environment.label
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center gap-1 rounded-lg border border-yellow-500 bg-yellow-500 bg-opacity-20 px-3 py-1 text-xs">
                  <AiOutlineCompress /> Compressed
                </div>
              </a>
            </Tooltip>
          )}
        </div>
        {phase.tokenChecks.filter(
          (c) => (c.mode.transfer || c.mode.burn) && c.addressKind.mint
        ).length === 0 ? (
          <div className="text-base font-bold">Prepaid</div>
        ) : (
          phase.tokenChecks
            .filter(
              (c) => (c.mode.transfer || c.mode.burn) && c.addressKind.mint
            )
            .map((c, i) => (
              <MintPhaseTokenPayment
                key={i}
                mint={c.address}
                amount={c.amount}
              />
            ))
        )}
      </div>
    </div>
  )
}
