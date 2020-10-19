// Styles
import './Title.scss'

// Libs
import * as React from 'react'

type TitleTypes = 'main' | 'form-section' | 'section-name';

// State and props
interface Props {
  // Kind of title we want to show
  type?: TitleTypes;
}

// //
// Component
// //
class Title extends React.PureComponent<Props, {}> {
  render() {
    const { type = 'main' } = this.props

    return (
      <div className={`react-title react-title-${type}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Title
