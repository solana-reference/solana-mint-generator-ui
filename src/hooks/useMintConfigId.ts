import { findMintConfigId } from '@/sdk'
import { firstParam } from '@cardinal/common'
import { tryPublicKey } from '@cardinal/namespaces-components'
import { useRouter } from 'next/router'

export const useMintConfigId = () => {
  const { query } = useRouter()
  return (
    tryPublicKey(query.config) ??
    findMintConfigId(firstParam(query.config ?? 'bodoggos'))
  )
}
