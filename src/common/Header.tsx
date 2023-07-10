import { AccountConnect } from '@cardinal/namespaces-components'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { GlyphWallet } from '@/assets/GlyphWallet'
import { useRouter } from 'next/router'
import { useEnvironmentCtx } from '@/providers/EnvironmentProvider'
import { useEffect, useState } from 'react'

import { asWallet } from './wallets'
import { ButtonSmall } from './ButtonSmall'
import { useMintConfigMetadata } from '@/hooks/useMintConfigMetadata'
import { useMintConfig } from '@/hooks/useMintConfig'
import { SolanaLogo } from '@/assets/SolanaLogo'

export const Header = () => {
  const router = useRouter()
  const wallet = useWallet()
  const mintConfigMetadata = useMintConfigMetadata()
  const mintConfig = useMintConfig()
  const walletModal = useWalletModal()
  const { secondaryConnection, environment } = useEnvironmentCtx()
  const [tab, setTab] = useState<string>('browse')

  useEffect(() => {
    const anchor = router.asPath.split('#')[1]
    if (anchor !== tab) setTab(anchor || 'browse')
  }, [router.asPath, tab])

  return (
    <div className="w-full px-4 py-4">
      <div className="flex min-h-[72px] flex-wrap items-center justify-center gap-3 rounded-xl bg-white bg-opacity-5 px-8 py-4 md:justify-between">
        <div className="flex items-center justify-center gap-4">
          <SolanaLogo className="relative top-[1px] inline-block h-6" />
          <div
            className="flex cursor-pointer items-center text-3xl transition-opacity hover:opacity-60"
            onClick={() => {
              router.push(`/${location.search}`)
            }}
          >
            {mintConfigMetadata.data?.displayName ??
              mintConfig.data?.parsed.name}
          </div>
          {environment.label !== 'mainnet-beta' && (
            <>
              <div className="text-primary">{environment.label}</div>
            </>
          )}
        </div>
        <div className="flex-5 flex items-center justify-end gap-6">
          {wallet.connected && wallet.publicKey ? (
            <AccountConnect
              dark={true}
              connection={secondaryConnection}
              environment={environment.label}
              handleDisconnect={() => wallet.disconnect()}
              wallet={asWallet(wallet)}
            />
          ) : (
            <ButtonSmall
              className="text-xs"
              onClick={() => walletModal.setVisible(true)}
            >
              <>
                <GlyphWallet />
                <>Connect wallet</>
              </>
            </ButtonSmall>
          )}
        </div>
      </div>
    </div>
  )
}
