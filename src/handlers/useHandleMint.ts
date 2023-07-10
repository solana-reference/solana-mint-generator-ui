import { useWallet } from '@solana/wallet-adapter-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notify } from '@/common/Notification'
import { asWallet } from '@/common/wallets'
import { useEnvironmentCtx } from '@/providers/EnvironmentProvider'
import { useMintConfig } from '@/hooks/useMintConfig'
import { mint } from '@/sdk'
import { executeTransaction } from '@cardinal/common'

export const useHandleMint = () => {
  const { connection, environment } = useEnvironmentCtx()
  const wallet = asWallet(useWallet())
  const queryClient = useQueryClient()
  const mintConfig = useMintConfig()
  return useMutation(
    ['useHandleMint'],
    async ({ phaseIx }: { phaseIx: number }): Promise<string> => {
      if (!mintConfig.data) throw 'No candy machine id found'
      if (!wallet.publicKey) throw 'Wallet not connected'
      const [tx, mintKeypair] = await mint(
        connection,
        wallet,
        mintConfig.data?.pubkey,
        phaseIx
      )
      const txid = await executeTransaction(connection, tx, wallet, {
        signers: mintKeypair ? [mintKeypair] : [],
      })
      console.log(
        `mint=[${mintKeypair?.publicKey.toString()}] config=[${mintConfig.data.pubkey.toString()}] https://explorer.solana.com/tx/${txid}?cluster=${
          environment.label
        }`
      )
      return txid
    },
    {
      onError: (e: any) => {
        console.log(e, 'logs' in e ? e.logs : [])
        notify({
          message: `Something went wrong with buying the token`,
          description: `Please check your balance and try again`,
          type: 'error',
        })
      },
      onSuccess: (txid) => {
        notify({
          message: `Succesfully minted 1 token`,
          txid,
          type: 'error',
        })
        queryClient.resetQueries()
      },
    }
  )
}
