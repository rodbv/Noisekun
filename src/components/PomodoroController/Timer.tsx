import React, { useState } from 'react'
import tw from 'tailwind-styled-components'

const padZero = (value: number) => value.toString().padStart(2, '0')

const CleanInput = tw.input`
  border-none
  appearance-none
  bg-transparent
  outline-none
  text-right
`

export const Timer = ({ remainingSeconds, setRemainingSeconds }) => {
  const handleChangeMinutes = event => {
    const { value } = event.target
    setRemainingSeconds(value * 60)
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
        value={getMinutes(remainingSeconds)}
      />
      :<div>{getRemainderSeconds(remainingSeconds)}</div>
    </>
  )
}
