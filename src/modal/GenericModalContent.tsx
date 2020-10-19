// Libs
import React from 'react'
import styled from 'styled-components'

// Styles
import './GenericModalContent.scss'

// Components
import { Label, ModalSizes } from './Modal'
import Button from '../button/Button'
import { noop } from 'lodash'

interface Props {
  children?: React.ReactNode
  layout?: 'modal' | 'dialog'
  title?: string | React.ReactNode
  description?: string
  subtitle?: string | React.ReactNode
  entity?: string
  // Overlays a spinner on the modal
  showSpinner?: boolean

  // Buttons
  cancelLabel?: Label
  confirmLabel?: Label
  confirmDisabled?: boolean

  hideFooter?: boolean

  size: ModalSizes

  // Interactions
  onCancel?: () => void
  onConfirm?: () => void
}

export default class GenericModalContent extends React.PureComponent<Props> {
  modalContainerClass = 'c-Modal'

  UNSAFE_componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false)
    document.addEventListener('click', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false)
    document.removeEventListener('click', this.handleOutsideClick)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    // Close the modal when pressing Esc
    if (e.keyCode === 27) {
      this.props.onCancel && this.props.onCancel()
    }
  }

  handleOutsideClick = (e: MouseEvent) => {
    // @ts-ignore
    if (e.target.className === this.modalContainerClass) {
      this.props.onCancel && this.props.onCancel()
    }

    return true
  }

  render() {
    const {
      confirmLabel,
      cancelLabel,
      title,
      entity,
      children,
      layout,
      confirmDisabled,
      onCancel,
      onConfirm,
      showSpinner,
      hideFooter,
      size,
    } = this.props
    let { subtitle } = this.props
    const modalClassName = `c-Modal__container c-Modal--layout-${layout} c-Modal--size-${size}`

    // Content
    let content
    let subtitleContainer

    if (subtitle) {
      if (entity) {
        subtitle = (subtitle as string).replace(
          '$entity$',
          `<span class="c-Modal__subtitle__entity">${entity}</span>`
        )
      }
      subtitleContainer = (
        <span
          className="c-Modal__subtitle"
          dangerouslySetInnerHTML={{
            __html: subtitle as string,
          }}
        ></span>
      )
    }

    const titleContainer = title && <h2 className="c-Modal__title">{title}</h2>
    const buttonsContainer = !hideFooter && (
      <div className="c-Modal__buttons-container">
        {confirmLabel && (
          <Button
            type={confirmLabel.type}
            text={confirmLabel.label}
            disabled={confirmDisabled}
            onClick={onConfirm ? onConfirm : noop}
          />
        )}
        {cancelLabel && (
          <Button
            type={cancelLabel.type}
            text={cancelLabel.label}
            onClick={onCancel ? onCancel : noop}
          />
        )}
      </div>
    )

    // Dialog
    if (layout === 'dialog') {
      content = (
        <span>
          {titleContainer}
          {buttonsContainer}
        </span>
      )
    }

    // Modal
    if (layout === 'modal') {
      content = (
        <div>
          {titleContainer}
          {subtitleContainer}
          {children ? (
            <div className="c-Modal__children">{children}</div>
          ) : null}
          {buttonsContainer}
        </div>
      )
    }

    // Spinner overlay
    let spinner

    if (showSpinner) {
      spinner = (
        <div className="c-Modal__spinner">
          <Spinner>Cargando...</Spinner>
        </div>
      )
    }

    return (
      <div className={this.modalContainerClass}>
        <div className={modalClassName}>
          {spinner}
          {content}
        </div>
      </div>
    )
  }
}

const Spinner = styled.div`
  font-size: 12px;
`
