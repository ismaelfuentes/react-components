import React, { Component } from 'react'

import {
  Button,
  ButtonTypes,
  GridContainer,
  GridRow,
  GridSizes,
  HeadLine,
  Text,
  Modal,
  ModalSizes,
  Icons,
} from 'react-components'

export default class ButtonSample extends Component {
  state = {
    showModalMedium: false,
    showModalSmall: false,
  }

  onButtonClick() {
    alert('button clicked')
  }

  showModalMedium = () => {
    this.setState({ showModalMedium: true })
  }

  showModalSmall = () => {
    this.setState({ showModalSmall: true })
  }

  hideModals = () => {
    this.setState({ showModalSmall: false, showModalMedium: false })
  }

  render() {
    const { showModalMedium, showModalSmall } = this.state

    return (
      <React.Fragment>
        <GridContainer separated="big">
          <GridRow size={GridSizes.FULL}>
            <HeadLine>Buttons</HeadLine>
          </GridRow>
          <GridRow size={GridSizes.FULL}>
            <Text>
              The buttons can be shown with different colors, disabled and
              attached a click event
            </Text>
          </GridRow>
          <GridRow size={GridSizes.QUARTER}>
            <Button
              text="Button Success"
              type={ButtonTypes.SUCCESS}
              onClick={this.onButtonClick}
              icon={Icons.Edit}
            />
          </GridRow>
          <GridRow size={GridSizes.QUARTER}>
            <Button
              text="Button Info"
              type={ButtonTypes.INFO}
              onClick={this.onButtonClick}
            />
          </GridRow>
          <GridRow size={GridSizes.QUARTER}>
            <Button
              text="Button Warning"
              type={ButtonTypes.WARNING}
              onClick={this.onButtonClick}
            />
          </GridRow>
          <GridRow size={GridSizes.QUARTER}>
            <Button
              text="Button Danger"
              type={ButtonTypes.DANGER}
              onClick={this.onButtonClick}
            />
          </GridRow>
          <GridRow size={GridSizes.QUARTER}>
            <Button
              text="Button Flat"
              type={ButtonTypes.FLAT}
              onClick={this.onButtonClick}
            />
          </GridRow>
          <GridRow size={GridSizes.QUARTER}>
            <Button
              text="Button Empty"
              type={ButtonTypes.EMPTY}
              onClick={this.onButtonClick}
              icon={Icons.Remove}
            />
          </GridRow>
          <GridRow size={GridSizes.QUARTER}>
            <Button
              text="Button Input"
              type={ButtonTypes.INPUT}
              onClick={this.onButtonClick}
            />
          </GridRow>
          <GridRow size={GridSizes.QUARTER}>
            <Button
              text="Button Disabled"
              type={ButtonTypes.SUCCESS}
              disabled={true}
              onClick={this.onButtonClick}
            />
          </GridRow>
          <GridRow size={GridSizes.QUARTER} newLine>
            <Button
              text="Open medium modal"
              type={ButtonTypes.INFO}
              onClick={this.showModalMedium}
            />
          </GridRow>
          <GridRow size={GridSizes.QUARTER}>
            <Button
              text="Open small modal"
              type={ButtonTypes.INFO}
              onClick={this.showModalSmall}
            />
          </GridRow>
        </GridContainer>
        {showModalMedium && (
          <Modal title="Modal medio" onCancel={this.hideModals} />
        )}
        {showModalSmall && (
          <Modal
            title="Modal pequeño"
            size={ModalSizes.Small}
            onCancel={this.hideModals}
          />
        )}
      </React.Fragment>
    )
  }
}
