import { useCallback, useState } from 'react'

const zeroPadding = (num: number) => `${num}`.padStart(2, '0')

const toDisplayTime = (sec: number) => {
  const m = Math.floor(sec / 60)
  const s = (sec % 60) % 60

  return `${zeroPadding(m)}:${zeroPadding(s)}`
}

export const useCountDownTimer = () => {
  const [timerID, setTimerID] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)

  const startTimer = useCallback(() => {
    setTimerID(
      window.setInterval(() => {
        setRemainingTime((prevTime) => Math.max(prevTime - 1, 0))
      }, 1000),
    )
  }, [])

  const startCountDown = (time: number) => {
    clearInterval(timerID)
    setRemainingTime(time)
    startTimer()
  }

  if (remainingTime === 0) {
    clearInterval(timerID)
  }

  return {
    startCountDown,
    remainingTime,
    displayTime: toDisplayTime(remainingTime),
  }
}
