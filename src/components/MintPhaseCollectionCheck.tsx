import type { IdlTypes } from '@/sdk'
import { shortPubKey } from '@cardinal/common'

export const MintPhaseCollectionCheck = ({
  tokenCheck,
}: {
  tokenCheck: IdlTypes['MintPhaseTokenCheck']
}) => {
  return (
    <div className="text-base font-bold">{shortPubKey(tokenCheck.address)}</div>
  )
}
