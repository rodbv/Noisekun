import React from 'react'
import tw from 'tailwind-styled-components'

const padZero = (value: number) => value.toString().padStart(2, '0')

const CleanInput = tw.input`
  border-none
  appearance-none
  bg-transparent
  outline-none
  text-right
`

export const Timer = ({
  remainingSeconds,
  onTimerChanged,
  onEnterKeyDown,
  isLoading
}) => {
  const handleChangeMinutes = event => {
    const { value } = event.target

    onTimerChanged(Math.max(0, Math.min(99, value)))
  }

  const handleKeyDown = event => {
    // ENTER or SPACE
    if (event.keyCode === 13 || event.keyCode === 32) {
      onEnterKeyDown()
    }
  }

  const getMinutes = totalSeconds => padZero(Math.floor(totalSeconds / 60))
  const getRemainderSeconds = totalSeconds => padZero(totalSeconds % 60)

  return (
    <>
      <CleanInput
        type="number"
        max={99}
        min={0}
        onChange={handleChangeMinutes}
        value={isLoading ? '' : getMinutes(remainingSeconds)}
        onKeyDown={handleKeyDown}
      />
      :<div>{getRemainderSeconds(remainingSeconds)}</div>
    </>
  )
}
