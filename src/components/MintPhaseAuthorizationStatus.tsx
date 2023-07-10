import { Tooltip } from '@/common/Tooltip'
import { useMintConfig } from '@/hooks/useMintConfig'
import { AiOutlineCheck, AiOutlineLock } from 'react-icons/ai'
import { useMintPhaseAuthorization } from '@/hooks/useMintPhaseAuthorization'
import type { IdlAccountData } from '@/sdk'
import { BN } from '@coral-xyz/anchor'

export const MintPhaseAuthorizationStatus = ({
  mintPhaseIx,
  mintPhase,
}: {
  mintPhaseIx: number
  mintPhase: IdlAccountData<'mintConfig'>['parsed']['mintPhases'][0]
}) => {
  const mintConfig = useMintConfig()
  const mintPhaseAuthorization = useMintPhaseAuthorization(
    mintConfig.data?.pubkey,
    mintPhaseIx
  )
  if (!mintPhase.authorization) return <></>
  return (
    <div className="flex">
      {!mintPhaseAuthorization.isFetched ? (
        <div className="h-[26px] w-16 animate-pulse rounded-lg bg-border" />
      ) : (!mintPhaseAuthorization.data &&
          mintPhase.authorization.mode.defaultAllowed) ||
        (mintPhaseAuthorization.data &&
          !mintPhaseAuthorization.data.parsed.remaining) ? (
        <Tooltip
          label="Your wallet is approved to mint"
          className="cursor-pointer"
        >
          <div className="flex items-center rounded-lg border border-primary bg-primary bg-opacity-20 px-3 py-1 text-xs">
            <AiOutlineCheck className="mr-1" /> Elligible
          </div>
        </Tooltip>
      ) : mintPhaseAuthorization.data &&
        mintPhaseAuthorization.data.parsed.remaining ? (
        <Tooltip
          label="Your wallet is approved to mint"
          className="cursor-pointer"
        >
          <div
            className={`flex items-center gap-1 rounded-lg border bg-opacity-20 px-3 py-1 text-xs ${
              mintPhaseAuthorization.data.parsed.remaining.gt(new BN(0))
                ? 'border-primary bg-primary'
                : 'border-red-500 bg-red-500'
            }`}
          >
            <AiOutlineCheck className="mr-1" /> Remaining (
            {mintPhaseAuthorization.data.parsed.remaining.toNumber()}/
            {mintPhaseAuthorization.data.parsed.remaining
              .add(mintPhaseAuthorization.data.parsed.count)
              .toNumber()}
            )
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          label="Your wallet is not approved to mint"
          className="cursor-pointer"
        >
          <div className="flex items-center gap-1 rounded-lg border border-red-500 bg-red-500 bg-opacity-20 px-3 py-1 text-xs">
            <AiOutlineLock /> Inelligible
          </div>
        </Tooltip>
      )}
    </div>
  )
}
