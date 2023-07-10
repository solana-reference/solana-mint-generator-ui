import type { Connection } from '@solana/web3.js'
import type { ReactChild } from 'react'
import React, { useContext, useEffect, useState } from 'react'

import { useEnvironmentCtx } from '@/providers/EnvironmentProvider'

const CLOCK_DRIFT_WARNING_THRESHOLD_SECONDS = 60 * 5
const CLOCK_RESET_THRESHOLD_SECONDS = 60 * 2 // 2 minutes
export interface UTCNowContextValues {
  UTCNow: number
  clockDrift: number | undefined
}

const UTCNowContext: React.Context<UTCNowContextValues> =
  React.createContext<UTCNowContextValues>({
    UTCNow: Math.floor(Date.now() / 1000),
    clockDrift: 0,
  })

const getSolanaClock = async (
  connection: Connection
): Promise<number | null> => {
  const epochInfo = await connection.getEpochInfo()
  const blockTimeInEpoch = await connection.getBlockTime(epochInfo.absoluteSlot)
  return blockTimeInEpoch
}

export function UTCNowProvider({ children }: { children: ReactChild }) {
  const { secondaryConnection, environment } = useEnvironmentCtx()
  const [UTCNow, setUTCNow] = useState(Date.now() / 1000)
  const [clockDrift, setClockDrift] = useState<number | undefined>(undefined)

  useEffect(() => {
    const interval = setInterval(
      (function fetchInterval(): () => void {
        setUTCNow((oldUTCNow) => oldUTCNow + 1)
        return fetchInterval
      })(),
      1000
    )
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(
      (function fetchInterval(): () => void {
        setUTCNow(Date.now() / 1000)
        return fetchInterval
      })(),
      CLOCK_RESET_THRESHOLD_SECONDS * 1000 // 2 minutes
    )
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(
      (function fetchInterval(): () => void {
        getSolanaClock(secondaryConnection)
          .then((solanaClock) => {
            if (
              solanaClock &&
              Math.abs(Date.now() / 1000 - solanaClock) >
                CLOCK_DRIFT_WARNING_THRESHOLD_SECONDS
            ) {
              setClockDrift(Date.now() / 1000 - solanaClock)
              setUTCNow(solanaClock)
            }
          })
          .catch((e) => {
            // pass
          })
        return fetchInterval
      })(),
      CLOCK_RESET_THRESHOLD_SECONDS * 1000 // 2 minutes
    )
    return () => clearInterval(interval)
  }, [environment.label])

  return (
    <UTCNowContext.Provider
      value={{
        UTCNow,
        clockDrift,
      }}
    >
      {children}
    </UTCNowContext.Provider>
  )
}

export function useUTCNow(): UTCNowContextValues {
  const context = useContext(UTCNowContext)
  return context
}
