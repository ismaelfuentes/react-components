// Libs
import React from 'react'
import { noop } from 'lodash'
// import TestRenderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import {default as Enzyme, mount} from 'enzyme'

import TabBar from './TabBar'

Enzyme.configure({ adapter: new Adapter() })

describe('==·== Tab bar Component ==·== ', () => {

  it('Has tab bar class', () => {
    const tabBar = mount(<TabBar tabs={[]} handleTabChange={noop} />)

    expect(tabBar.children().hasClass('tabBar__container')).toEqual(true)
  })
})
