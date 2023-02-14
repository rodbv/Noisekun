import { create } from 'zustand'

export enum PomodoroStatus {
  Idle = 'idle',
  Ticking = 'ticking',
  Stopped = 'stopped'
}

interface PomodoroState {
  pomodoroStatus: PomodoroStatus
  setPomodoroStatus: (newStatus: PomodoroStatus) => void
}

export const usePomodoroStore = create<PomodoroState>(set => ({
  pomodoroStatus: PomodoroStatus.Idle,
  setPomodoroStatus: (newStatus: PomodoroStatus) =>
    set(() => ({ pomodoroStatus: newStatus }))
}))
