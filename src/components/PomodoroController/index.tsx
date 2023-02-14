import React, { useState, useEffect } from 'react'
import { FiPause, FiPlay } from 'react-icons/fi'
import { PomodoroStatus, usePomodoroStore } from '../../stores/PomodoroStore'
import { Container, TimerContainer } from './styles'
import { Timer } from './Timer'

const DEFAULT_TIMER = 13
export const PomodoroController = () => {
  const setPomodoroStatus = usePomodoroStore(state => state.setPomodoroStatus)
  const pomodoroStatus = usePomodoroStore(state => state.pomodoroStatus)

  const [remaining, setRemaining] = useState(DEFAULT_TIMER)
  const [isTicking, setIsTicking] = useState(false)

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

  const handleClick = () => {
    if (remaining === 0) {
      setRemaining(DEFAULT_TIMER)
    }
    const nextIsTicking = !isTicking
    setIsTicking(nextIsTicking)
    setPomodoroStatus(
      nextIsTicking ? PomodoroStatus.Ticking : PomodoroStatus.Stopped
    )
  }

  const PomodoroToggle = () => {
    return pomodoroStatus === PomodoroStatus.Ticking ? <FiPause /> : <FiPlay />
  }

  return (
    <Container>
      <button title="Toggle Pomodoro timer" onClick={handleClick}>
        <TimerContainer>
          <Timer
            remainingSeconds={remaining}
            setRemainingSeconds={setRemaining}
          />
          <PomodoroToggle />
        </TimerContainer>
      </button>
    </Container>
  )
}
