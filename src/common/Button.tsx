import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { LoadingSpinner } from './LoadingSpinner'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  icon?: JSX.Element
  count?: number
  className?: string
  disabled?: boolean
  loading?: boolean
  inlineLoader?: boolean
  loader?: React.ReactElement
  colorized?: boolean
}

export const Button: React.FC<Props> = ({
  children,
  onClick,
  className,
  disabled,
  loading,
  inlineLoader,
  loader,
  colorized = true,
  ...rest
}: Props) => {
  const [loadingClick, setLoadingClick] = useState(false)
  const loaderElement = loader || (
    <LoadingSpinner height="15" className="flex items-center justify-center" />
  )
  return (
    <div
      {...rest}
      className={twMerge(
        `flex items-center gap-1 rounded-lg bg-primary p-3 text-light-0 transition-colors`,
        disabled
          ? 'cursor-default opacity-50'
          : 'cursor-pointer hover:bg-primary-hover',
        className
      )}
      onClick={async (e) => {
        if (!onClick || disabled) return
        try {
          setLoadingClick(true)
          await onClick(e)
        } finally {
          setLoadingClick(false)
        }
      }}
    >
      {loading || loadingClick ? (
        inlineLoader ? (
          <div className="flex items-center justify-center gap-2">
            {loaderElement}
            {children}
          </div>
        ) : (
          loaderElement
        )
      ) : (
        children
      )}
    </div>
  )
}
