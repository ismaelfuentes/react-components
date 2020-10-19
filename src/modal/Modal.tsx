// Libs
import React from 'react'
import { noop} from 'lodash'

// Components
import GenericModalContent from './GenericModalContent'

const modalRoot = document.getElementById('modal-root') as HTMLElement
// assuming in your html file has a div with id 'modal-root';

export interface Label {
  type: 'success' | 'flat' | 'danger' | 'warning'
  label: string
}

export enum ModalSizes {
  Big = 'Big',
  Medium = 'Medium',
  Small = 'Small'
}

interface Props {
  children?: React.ReactNode

  layout?: 'modal' | 'dialog'
  title?: string | React.ReactNode
  subtitle?: string | React.ReactNode
  // If entity given, replace the string $entity$ of the subtitle by this string in other color
  entity?: string
  // Buttons
  cancelLabel?: Label
  confirmLabel?: Label
  confirmDisabled?: boolean
  // Hide the footer if wanted
  hideFooter?: boolean
  size?: ModalSizes

  // Interactions
  onCancel?: () => void
  onConfirm?: () => void
}

class Modal extends React.Component<Props> {
  static defaultProps = {
    title: undefined,
    layout: 'modal',
    showSpinner: false,
    cancelLabel: null,
    confirmLabel: null,
    subtitle: '',
    confirmDisabled: false,
    hideFooter: false,
    onCancel: noop,
    onConfirm: noop
  };
  el: HTMLElement = document.createElement('div');

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    const {
      children,
      layout,
      title,
      subtitle,
      entity,
      cancelLabel,
      confirmLabel,
      confirmDisabled,
      onCancel,
      onConfirm,
      hideFooter,
      size = ModalSizes.Medium
    } = this.props

    return (
      <GenericModalContent
        layout={layout}
        title={title}
        subtitle={subtitle}
        entity={entity}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmDisabled={confirmDisabled}
        hideFooter={hideFooter}
        size={size}
      >
        {children}
      </GenericModalContent>
    )
  }
}
export default Modal
