import { useState, useEffect, useCallback, useRef } from 'react'

export function useWakeLock() {
  const [active, setActive] = useState(false)
  const lockRef = useRef(null)
  const supported = typeof navigator !== 'undefined' && 'wakeLock' in navigator

  const request = useCallback(async () => {
    if (!supported) return
    try {
      lockRef.current = await navigator.wakeLock.request('screen')
      setActive(true)
      lockRef.current.addEventListener('release', () => setActive(false))
    } catch {
      setActive(false)
    }
  }, [supported])

  const release = useCallback(() => {
    lockRef.current?.release()
    lockRef.current = null
    setActive(false)
  }, [])

  const toggle = useCallback(() => {
    active ? release() : request()
  }, [active, release, request])

  // Re-acquire after tab becomes visible again
  useEffect(() => {
    if (!active) return
    const handler = () => {
      if (document.visibilityState === 'visible') request()
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [active, request])

  return { active, toggle, supported }
}
