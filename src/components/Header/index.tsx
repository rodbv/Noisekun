import React from 'react'
import Link from 'next/link'

import { GlobalVolumeController } from '../GlobalVolumeController'
import { PomodoroController } from '../PomodoroController'
import { BackgroundMenu } from '../BackgroundMenu'

import {
  Container,
  HeaderTitle,
  SettingsContainer,
  ToolsContainer
} from './styles'

export const Header: React.FC = () => {
  return (
    <Container>
      <HeaderTitle>
        <Link href="/">Noisekun</Link>
      </HeaderTitle>
      <ToolsContainer>
        <PomodoroController />
      </ToolsContainer>
      <SettingsContainer>
        <GlobalVolumeController />
        <BackgroundMenu />
      </SettingsContainer>
    </Container>
  )
}
