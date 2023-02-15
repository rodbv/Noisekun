import React, { useState, useEffect } from 'react'
import { FiPause, FiPlay } from 'react-icons/fi'
import { PomodoroStatus, usePomodoroStore } from '../../stores/PomodoroStore'
import { Container, TimerContainer } from './styles'
import { Timer } from './Timer'

export const PomodoroController = () => {
  const setPomodoroStatus = usePomodoroStore(state => state.setPomodoroStatus)
  const pomodoroStatus = usePomodoroStore(state => state.pomodoroStatus)

  const [remaining, setRemaining] = useState(25 * 60)
  const [isTicking, setIsTicking] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const DEFAULT_POMODORO_MINUTES = 25

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const defaultTimerStored = localStorage.getItem('default-timer-minutes')
      if (defaultTimerStored) {
        setRemaining(+defaultTimerStored * 60)
      }
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!isTicking) return

      const nextRemaining = remaining - 1
      setRemaining(nextRemaining)
      if (nextRemaining === 0) {
        setIsTicking(false)
        setPomodoroStatus(PomodoroStatus.Stopped)
      }
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [isTicking, remaining])

  const handleToggle = () => {
    if (remaining === 0) {
      setRemaining(DEFAULT_POMODORO_MINUTES * 60)
    }
    const nextIsTicking = !isTicking
    setIsTicking(nextIsTicking)
    setPomodoroStatus(
      nextIsTicking ? PomodoroStatus.Ticking : PomodoroStatus.Stopped
    )
  }

  const handleChangeTimer = minutes => {
    if (pomodoroStatus === PomodoroStatus.Ticking) {
      setPomodoroStatus(PomodoroStatus.Idle)
    }
    setIsTicking(false)
    setRemaining(minutes * 60)
    localStorage.setItem('default-timer-minutes', minutes)
  }
  const PomodoroToggle = () => {
    return (
      <button title="Toggle Pomodoro timer" onClick={handleToggle}>
        {pomodoroStatus === PomodoroStatus.Ticking ? <FiPause /> : <FiPlay />}
      </button>
    )
  }

  return (
    <Container>
      <TimerContainer>
        <Timer
          remainingSeconds={remaining}
          onTimerChanged={handleChangeTimer}
          onEnterKeyDown={handleToggle}
          isLoading={isLoading}
        />
        <PomodoroToggle />
      </TimerContainer>
    </Container>
  )
}
