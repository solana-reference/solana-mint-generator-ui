import './styles.css'
import '@cardinal/namespaces-components/dist/esm/styles.css'
import 'tailwindcss/tailwind.css'

import { WalletIdentityProvider } from '@cardinal/namespaces-components'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  BackpackWalletAdapter,
  BraveWalletAdapter,
  CoinbaseWalletAdapter,
  FractalWalletAdapter,
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from '@/common/Notification'
import type { AppProps } from 'next/app'
import { EnvironmentProvider } from '@/providers/EnvironmentProvider'
import { ModalProvider } from '@/providers/ModalProvider'
import { UTCNowProvider } from '@/providers/UTCNowProvider'
import { useMemo } from 'react'
import type { NextPageContext } from 'next'
import { firstParam } from '@cardinal/common'

require('@solana/wallet-adapter-react-ui/styles.css')

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

export const getInitialProps = async ({
  ctx,
}: {
  ctx: NextPageContext
}): Promise<{
  cluster: string
  hostname: string
}> => {
  const host = ctx.req?.headers.host || ctx.query.host
  const cluster = host?.includes('dev')
    ? 'devnet'
    : (ctx.query.project || ctx.query.host)?.includes('test')
    ? 'testnet'
    : ctx.query.cluster || process.env.BASE_CLUSTER

  return {
    cluster: firstParam(cluster),
    hostname: (ctx.req?.headers.host || ctx.query.host)?.toString() || '',
  }
}

const App = ({
  Component,
  pageProps,
  cluster,
}: AppProps & { cluster: string }) => {
  const network = useMemo(() => {
    switch (cluster) {
      case 'mainnet':
        return WalletAdapterNetwork.Mainnet
      case 'devnet':
        return WalletAdapterNetwork.Devnet
      case 'testnet':
        return WalletAdapterNetwork.Testnet
      default:
        return WalletAdapterNetwork.Mainnet
    }
  }, [cluster])

  const wallets = useMemo(
    () => [
      new BraveWalletAdapter(),
      new PhantomWalletAdapter(),
      new BackpackWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new CoinbaseWalletAdapter(),
      new SlopeWalletAdapter(),
      new FractalWalletAdapter(),
      new GlowWalletAdapter({ network }),
      new LedgerWalletAdapter(),
      new TorusWalletAdapter({ params: { network, showTorusButton: false } }),
    ],
    [network]
  )
  return (
    <EnvironmentProvider defaultCluster={cluster}>
      <UTCNowProvider>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletIdentityProvider>
            <QueryClientProvider client={queryClient}>
              <ModalProvider>
                <WalletModalProvider>
                  <>
                    <ToastContainer />
                    <Component {...pageProps} />
                    {<ReactQueryDevtools initialIsOpen={false} />}
                  </>
                </WalletModalProvider>
              </ModalProvider>
            </QueryClientProvider>
          </WalletIdentityProvider>
        </WalletProvider>
      </UTCNowProvider>
    </EnvironmentProvider>
  )
}

App.getInitialProps = getInitialProps

export default App
