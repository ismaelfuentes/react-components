/* Enzyme is not working with svg imports as reactComponents
// Libs
import React from 'react'
// import TestRenderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import {default as Enzyme, mount} from 'enzyme'

import Select, { SelectTypes } from './Select'

Enzyme.configure({ adapter: new Adapter() })

describe('==·== Select Component ==·== ', () => {

  it('Sentiment selector renderices the appropiate one', () => {

    const onChange = (id: string, value: any) => {
      console.log(id,value)
    }

    const select = mount(
      <Select
        id="SelectTest"
        type={SelectTypes.SENTIMENT_SELECTOR}
        onChange={onChange}
        value="POSITIVE"
        label="Select de sentimiento"
      />
    )
    expect(select.find("#sentimentSelector").exists()).toEqual(true)
  })
})
*/
