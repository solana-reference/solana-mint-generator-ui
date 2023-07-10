import type * as PopperJS from '@popperjs/core'
import React, { useCallback, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { twMerge } from 'tailwind-merge'

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  placement?: PopperJS.Placement
  enterDelay?: number
  leaveDelay?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  label,
  enterDelay = 250,
  leaveDelay = 150,
  placement = 'bottom',
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  })

  const enterTimeout = useRef<NodeJS.Timeout>()
  const leaveTimeout = useRef<NodeJS.Timeout>()
  const handleMouseEnter = useCallback(() => {
    leaveTimeout.current && clearTimeout(leaveTimeout.current)
    enterTimeout.current = setTimeout(() => setIsOpen(true), enterDelay)
  }, [enterDelay])
  const handleMouseLeave = useCallback(() => {
    enterTimeout.current && clearTimeout(enterTimeout.current)
    leaveTimeout.current = setTimeout(() => setIsOpen(false), leaveDelay)
  }, [leaveDelay])

  return (
    <div className={className}>
      <div
        ref={setReferenceElement}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={'relative'}
      >
        {children}
      </div>

      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={twMerge([
          `z-50 max-w-[50vw] rounded-md bg-dark-3 px-2 py-1 text-left text-xs text-light-0 transition-all duration-200`,
          isOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-50 opacity-0',
        ])}
      >
        {label}
      </div>
    </div>
  )
}
