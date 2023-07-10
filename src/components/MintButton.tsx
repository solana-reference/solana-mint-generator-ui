import { Button } from '@/common/Button'
import { Tooltip } from '@/common/Tooltip'
import { useHandleMint } from '@/handlers/useHandleMint'
import { useMintConfig } from '@/hooks/useMintConfig'
import { useMintPhaseAuthorization } from '@/hooks/useMintPhaseAuthorization'
import { useWalletId } from '@/hooks/useWalletId'
import type { IdlAccountData } from '@/sdk'
import { BN } from '@coral-xyz/anchor'

export const MintButton = ({
  phaseIx,
  phase,
}: {
  phaseIx: number | null
  phase: IdlAccountData<'mintConfig'>['parsed']['mintPhases'][0] | null
}) => {
  const handleMint = useHandleMint()
  const walletId = useWalletId()
  const mintConfig = useMintConfig()
  const mintPhaseAuthorization = useMintPhaseAuthorization(
    mintConfig.data?.pubkey,
    phaseIx
  )

  const disabled =
    phaseIx == null ||
    !mintConfig.data ||
    mintConfig.data.parsed.count.eq(mintConfig.data.parsed.supply) ||
    !walletId ||
    (!!phase?.authorization &&
      (mintPhaseAuthorization.data?.parsed &&
      mintPhaseAuthorization.data?.parsed.remaining
        ? mintPhaseAuthorization.data?.parsed.remaining.lte(new BN(0))
        : phase?.authorization?.mode.defaultDisallowed &&
          !mintPhaseAuthorization.data?.parsed))
  return (
    <Tooltip
      className="w-full cursor-pointer"
      label={
        disabled
          ? 'Wallet not elligible to mint during phase. Check whitelist.'
          : 'Mint 1 token'
      }
    >
      <Button
        className="flex w-full justify-center"
        loading={handleMint.isLoading}
        inlineLoader
        disabled={disabled}
        onClick={() => phaseIx !== null && handleMint.mutate({ phaseIx })}
      >
        Mint
      </Button>
    </Tooltip>
  )
}
