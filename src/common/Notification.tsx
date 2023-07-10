import type { Cluster } from '@solana/web3.js'
import toast, { resolveValue, ToastBar, Toaster } from 'react-hot-toast'
import { VscClose } from 'react-icons/vsc'

interface INotifyArgs {
  message?: string
  description?: React.ReactNode
  txid?: string
  txids?: string[]
  cluster?: Cluster
  type?: 'success' | 'error' | 'info' | 'warn'
}

export function notify({
  message,
  description,
  txid,
  txids,
  cluster,
  type = 'info',
}: INotifyArgs): void {
  const logLevel =
    type === 'warn' ? 'warn' : type === 'error' ? 'error' : 'info'
  if (txids?.length === 1) {
    txid = txids[0]
  }
  console[logLevel](`Notify: ${message ?? '<no message>'}`, description, {
    cluster,
    txid,
    txids,
    type,
  })

  if (txid) {
    description = (
      <div>
        View Transaction:{' '}
        <a
          href={`https://explorer.solana.com/tx/${txid}?cluster=${
            cluster?.toString() ?? ''
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {txid.slice(0, 8)}...{txid.slice(txid.length - 8)}
        </a>
      </div>
    )
  } else if (txids) {
    description = (
      <div>
        View Transactions:{' '}
        <div className="flex gap-4">
          {txids.map((txid, i) => (
            <a
              key={i}
              href={`https://explorer.solana.com/tx/${txid}?cluster=${
                cluster?.toString() ?? ''
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              [{i + 1}]
            </a>
          ))}
        </div>
      </div>
    )
  }
  toast(
    <div className="flex flex-col gap-1 text-sm">
      <div className="font-medium">{message}</div>
      {description && <div style={{ opacity: '.5' }}>{description}</div>}
    </div>,
    { duration: 5000 }
  )
}

export function ToastContainer() {
  return (
    <Toaster position="top-right">
      {(t) => (
        <ToastBar
          toast={t}
          style={{ background: 'none', border: 'none', padding: '0px' }}
        >
          {() => (
            <div
              className={`bg-dark-0 relative flex w-full max-w-sm gap-4 rounded border border-border p-4 text-light-0 shadow ${
                t.visible ? 'animate-enter' : 'animate-leave'
              }`}
            >
              {resolveValue(t.message, t)}
              <button className={``} onClick={() => toast.dismiss(t.id)}>
                <VscClose />
              </button>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}
