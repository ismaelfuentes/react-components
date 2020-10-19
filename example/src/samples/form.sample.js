import React, { Component } from 'react'

import {
  Input,
  Select,
  SelectTypes,
  GridContainer,
  GridRow,
  GridSizes,
  HeadLine,
  Text,
  SwitchInput,
  Tag,
} from 'react-components'

export default class ButtonSample extends Component {
  onSelectChange = (key, value) => {
    console.log(key, value)
  }

  render() {
    const options = [
      {
        label: 'nombre de algo2',
        value: 'name2',
      },
      {
        label: 'nombre de algo3',
        value: 'name3',
      },
      {
        label: 'nombre de algo',
        value: 'name',
      },
    ]

    const value = [
      {
        label: 'nombre de algo2',
        value: 'name2',
      },
      {
        label: 'nombre de algo3',
        value: 'name3',
      },
    ]

    return (
      <GridContainer separated="big">
        <GridRow size={GridSizes.FULL}>
          <HeadLine>Input</HeadLine>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <Text>
            The inputs to allow the user to provide data are very flexible and
            can be used in very different situations.
          </Text>
        </GridRow>
        <GridRow size={GridSizes.HALF}>
          <Input
            type="text"
            label="Input de texto normal"
            placeholder="El placeholder classic"
            tooltipText="Esto es un tooltip de ejemplo"
          />
        </GridRow>
        <GridRow size={GridSizes.HALF}>
          <Input
            type="number"
            label="Input numérico con error"
            error
            errorText="Algo ha ido mal y lo sabes y además soy input de config"
            isConfig
          />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <HeadLine>Select</HeadLine>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <Text>
            A specially complex input type is the select, we can use it as a
            simple select or multi-select.
          </Text>
        </GridRow>
        <GridRow size={GridSizes.HALF}>
          <Select
            options={options}
            onChange={this.onSelectChange}
            value="name3"
            showEmpty={true}
            label="Select normal"
            tooltipText="Tooltip del select"
          />
        </GridRow>
        <GridRow size={GridSizes.HALF}>
          <Select
            options={options}
            onChange={this.onSelectChange}
            multi={true}
            transparentInput={true}
            value={value}
            label="Select múltiple sin bordes"
          />
        </GridRow>
        <GridRow size={GridSizes.HALF}>
          <Select
            type={SelectTypes.SENTIMENT_SELECTOR}
            onChange={this.onSelectChange}
            value="POSITIVE"
            showEmpty={true}
            label="Select de sentimiento"
          />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <HeadLine>Switch</HeadLine>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <Tag sentiment="OBJECTIVE" />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <Text>Special checkbox design</Text>
        </GridRow>
        <GridRow size={GridSizes.HALF}>
          <SwitchInput />
        </GridRow>
      </GridContainer>
    )
  }
}
