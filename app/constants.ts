export enum PomodoroPhases {
  Focus,
  ShortBreak,
  LongBreak,
}
export const POMODORO_SEQUENCE = [
  PomodoroPhases.Focus,
  PomodoroPhases.ShortBreak,
  PomodoroPhases.Focus,
  PomodoroPhases.ShortBreak,
  PomodoroPhases.Focus,
  PomodoroPhases.ShortBreak,
  PomodoroPhases.Focus,
  PomodoroPhases.LongBreak
]

export const POMODORO_DURATION = {
  [PomodoroPhases.Focus]: 25 * 60, // 25 minutes
  [PomodoroPhases.ShortBreak]: 5 * 60, // 5 minutes
  [PomodoroPhases.LongBreak]: 20 * 60 // 20 minutes
}
