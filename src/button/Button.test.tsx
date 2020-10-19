// Libs
import React from 'react'
import TestRenderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import { default as Enzyme, shallow } from 'enzyme'
import { noop } from 'lodash'

import Button from './Button'

Enzyme.configure({ adapter: new Adapter() })

describe('==·== Button Component ==·== ', () => {
  it('Show text inside the button', () => {
    const testRenderer = TestRenderer.create(
      <Button text="hola" onClick={noop} />
    )
    const testInstance = testRenderer.root

    expect(testInstance.findByType('div').children).toEqual(['hola'])
  })

  it('Clicking the button executes the onClick function', () => {
    const mockFunction = jest.fn()
    const button = shallow(<Button text="hola" onClick={mockFunction} />)

    button.simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })
})
