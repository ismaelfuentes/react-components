import React, { Component } from 'react'

import {
  TabBar,
  GridContainer,
  GridRow,
  GridSizes,
  HeadLine,
  Text,
} from 'react-components'

import { noop } from 'lodash'
export default class TabBarSample extends Component {
  smallTabs = ['Users', 'Clients', 'Fishes']
  bigTabs = [
    'Users',
    'Clients',
    'Fishes',
    'Play movils',
    'Broken hearts',
    'A big one because i am tired to write',
    'Lorem ipsum dolor',
    'The ucm is the best university',
    'The UX is never right but we cannot say',
    'Vodafone',
    'The lion king',
    'Spotify for pets',
    'Pets for spotify',
    'Broken computer',
    'Why you keep scrolling?',
    'You should not be here',
    'Run you fools',
    'Last one',
  ]

  state = {
    tabs: this.bigTabs,
  }

  render() {
    return (
      <GridContainer separated="big">
        <GridRow size={GridSizes.FULL}>
          <HeadLine>Tab bar</HeadLine>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <Text>
            The tab bar will be display the tabs in one line with custom scroll
            if needed
          </Text>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <TabBar tabs={this.state.tabs} handleTabChange={noop} />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <Text>We can also have a secondary tab bar</Text>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <TabBar tabs={this.smallTabs} handleTabChange={noop} isMain={false} />
        </GridRow>
      </GridContainer>
    )
  }
}
