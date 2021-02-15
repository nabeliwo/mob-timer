import { useCallback, useState } from 'react'

const zeroPadding = (num: number) => `${num}`.padStart(2, '0')

const toDisplayTime = (sec: number) => {
  const m = Math.floor(sec / 60)
  const s = (sec % 60) % 60

  return `${zeroPadding(m)}:${zeroPadding(s)}`
}

export const useCountDownTimer = () => {
  const [minutes, setMinutes] = useState(20)
  const [timerID, setTimerID] = useState(0)
  const [remainingTime, setRemainingTime] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const startTimer = useCallback(() => {
    setTimerID(
      window.setInterval(() => {
        setRemainingTime((prevTime) => Math.max(prevTime - 1, 0))
      }, 1000),
    )
  }, [])

  const startCountDown = () => {
    clearInterval(timerID)
    setRemainingTime(minutes * 60)
    startTimer()
  }

  const toggleIsPaused = () => {
    if (isPaused) {
      startTimer()
    } else {
      clearInterval(timerID)
    }

    setIsPaused((currentIsPaused) => !currentIsPaused)
  }

  if (remainingTime === 0) {
    clearInterval(timerID)
  }

  return {
    minutes,
    remainingTime,
    isPaused,
    displayTime: toDisplayTime(remainingTime),
    setMinutes,
    startCountDown,
    toggleIsPaused,
  }
}
