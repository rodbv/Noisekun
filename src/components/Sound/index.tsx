/* eslint-disable multiline-ternary */
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { useGlobalVolumeStore } from '../../stores/GlobalVolumeStore'

import { VolumeController } from '../VolumeController'

import { Container, Icon } from './styles'
import { PomodoroStatus, usePomodoroStore } from '../../stores/PomodoroStore'

export interface ISound {
  id: string
  title: string
  iconFile: string
  audioFile: {
    name: string
    type: string
  }
}

interface SoundProps {
  soundData: ISound
}

export const Sound: React.FC<SoundProps> = ({ soundData }) => {
  const globalVolume = useGlobalVolumeStore(state => state.globalVolume)
  const pomodoroStatus = usePomodoroStore(state => state.pomodoroStatus)

  const [soundIsActive, setSoundIsActive] = useState(false)
  const [localSoundVolume, setLocalSoundVolume] = useState(1)

  const soundRef = useRef<HTMLAudioElement>()

  function toggleSoundState() {
    if (soundIsActive) soundRef.current.pause()
    else soundRef.current.play()

    setSoundIsActive(!soundIsActive)
  }

  function handleLocalSoundVolume(volume: number) {
    setLocalSoundVolume(volume)
    localStorage.setItem(`${soundData.id}-volume`, String(localSoundVolume))
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageValue = localStorage.getItem(`${soundData.id}-volume`)
      if (storageValue) setLocalSoundVolume(JSON.parse(storageValue))
      else {
        localStorage.setItem(`${soundData.id}-volume`, String(localSoundVolume))
      }
    }
  }, [])

  useEffect(() => {
    const pomodoroVolume = pomodoroStatus === PomodoroStatus.Stopped ? 0 : 1
    soundRef.current.volume = localSoundVolume * globalVolume * pomodoroVolume
  }, [globalVolume, localSoundVolume, pomodoroStatus])

  return (
    <Container title={soundData.title}>
      <audio ref={soundRef} preload="auto" loop>
        <source
          src={`/sounds/${soundData.audioFile.name}`}
          type={soundData.audioFile.type}
        />
      </audio>
      <Icon $active={soundIsActive} onClick={() => toggleSoundState()}>
        <Image
          src={`/assets/${soundData.iconFile}`}
          alt={soundData.title}
          width={80}
          height={80}
        />
      </Icon>
      <VolumeController
        isActive={soundIsActive}
        soundName={soundData.title}
        soundNameOnLocalStorage={soundData.id}
        handleSoundVolume={handleLocalSoundVolume}
      />
    </Container>
  )
}
