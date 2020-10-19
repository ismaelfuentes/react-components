import React from 'react'

import {
  Tag,
  GridContainer,
  GridRow,
  GridSizes,
  HeadLine,
  Text,
} from 'react-components'

function TagSample() {
  const options = [
    { label: 'Positivo', value: 'Positivo' },
    { label: 'Negativo', value: 'Negativo' },
    { label: 'Neutro', value: 'Neutro' },
  ]

  return (
    <GridContainer separated="big">
      <GridRow size={GridSizes.FULL}>
        <HeadLine>Tags</HeadLine>
      </GridRow>
      <GridRow size={GridSizes.FULL}>
        <Text>
          The tags are used to show important info of an entity, a state or a
          filter
        </Text>
      </GridRow>
      <GridRow size={GridSizes.QUARTER}>
        <Tag color="blue_ocean" editable editOptions={options}>
          soy un tag editable
        </Tag>
      </GridRow>
      <GridRow size={GridSizes.QUARTER}>
        <Tag
          color="grey"
          clearable
          crossClick={() => {
            alert('Cerrardo')
          }}
          persistentButton
        >
          Puedes eliminarme
        </Tag>
      </GridRow>
    </GridContainer>
  )
}

export default TagSample
