// Libs
import {default as React} from 'react'
import styled from 'styled-components'

// Styles
import colors from '../styles/colors.json'
import './TabBar.scss'

// State and props
interface Props {
  // Names of the shown
  tabs: string[];

  // index of the selected tab
  selectedTab?: number;

  // Callback when a tab is selected
  handleTabChange: (selectedTab: number) => void;

  // the tab bar can be a main tab bar or a secondary
  isMain?: boolean
}

interface State {
  selectedTab: number;
  showBackwardScrollButton: boolean;
  showForwardScrollButton: boolean;
  scrollAmount: number;
}

// //
// Component
// //
class TabComponent extends React.PureComponent<Props, State> {
  static defaultProps = {
    isMain: true
  }

  state: State = {
    selectedTab: this.props.selectedTab || 0,
    showBackwardScrollButton: false,
    showForwardScrollButton: false,
    scrollAmount: 0
  }

  scrollableContainer: any = null
  tabContainer: any = null

  constructor(props:Props) {
    super(props)
    this.scrollableContainer = React.createRef() as React.MutableRefObject<HTMLDivElement>
    this.tabContainer = React.createRef() as React.MutableRefObject<HTMLDivElement>
  }

  componentDidMount() {
    const scrollable = this.tabContainer.current.offsetWidth < this.scrollableContainer.current.scrollWidth

    this.setState({ showForwardScrollButton: scrollable })
  }

  componentDidUpdate(prevProps: Props) {
    if(this.props.tabs !== prevProps.tabs) {
      const scrollable = this.tabContainer.current.offsetWidth < this.scrollableContainer.current.scrollWidth

      this.setState({ 
        showForwardScrollButton: scrollable,
        showBackwardScrollButton: false,
        scrollAmount: 0,
        selectedTab: 0
      })
    } else {
      if(this.props.selectedTab !== undefined && this.props.selectedTab !== this.state.selectedTab) {
        this.setState({selectedTab: this.props.selectedTab})
      }
    }
  }

  onScrollForward = () => {
    const neededScroll = this.scrollableContainer.current.scrollWidth - this.tabContainer.current.offsetWidth
    const scrollMovement = Math.floor(this.tabContainer.current.offsetWidth / 2)

    if(this.state.scrollAmount + scrollMovement >= neededScroll) {
      this.setState({
        scrollAmount: neededScroll,
        showForwardScrollButton: false,
        showBackwardScrollButton: true
      })
    } else {
      this.setState({
        scrollAmount: this.state.scrollAmount + scrollMovement,
        showBackwardScrollButton: true
      })
    }
  }

  onScrollBackward = () => {
    const scrollMovement = Math.floor(this.tabContainer.current.offsetWidth / 2)

    if(this.state.scrollAmount - scrollMovement <= 0) {
      this.setState({
        scrollAmount: 0,
        showBackwardScrollButton: false,
        showForwardScrollButton: true
      })
    } else {
      this.setState({
        scrollAmount: this.state.scrollAmount - scrollMovement,
        showForwardScrollButton: true
      })
    }
  }

  handleTabSelected = (selectedTab: number) => {
    this.setState({ selectedTab })
    this.props.handleTabChange(selectedTab)
  };

  render() {
    const { tabs = [], isMain } = this.props
    const { 
      showBackwardScrollButton,
      showForwardScrollButton,
      scrollAmount
    } = this.state

    const tabList = tabs.map((tab: string, index: number) => {
      return (
        <Tab
          key={index}
          selected={index === this.state.selectedTab}
          onClick={() => this.handleTabSelected(index)}
          secondary={!isMain}
        >
          {tab}
        </Tab>
      )
    })

    // NOTE: Cannot use styledComponents with refs because it doesn't work for cx (Couldn't fix it so changed it to css classes)
    return (
      <div className={`tabBar__container ${!isMain ? 'tabBar__container__secondary' : ''}`} ref={this.tabContainer} >
        {showBackwardScrollButton && (
          <ScrollButton isForward={false} onClick={this.onScrollBackward}>{'‹'}</ScrollButton>
        )}
        <div className="tabBar__scrollable" style={{transform: 'translateX(-' + scrollAmount + 'px)'}} ref={this.scrollableContainer}>
          {tabList}
        </div>
        {showForwardScrollButton && (
          <ScrollButton isForward={true} onClick={this.onScrollForward}>{'›'}</ScrollButton>
        )}
      </div>
    )
  }
}

export default TabComponent

// //
// Styles
// //

const ScrollButton = styled.div<{ isForward: boolean }>`
  display: block;
  position: absolute;
  width: 15px;
  height: 15px;
  line-height: 12px;
  text-align: center;
  background: white;
  color: ${colors.light_gray};
  cursor: pointer;
  top: 18px;
  ${props => props.isForward ? 'right: 0px' : 'left: 0px'};
  z-index: 1;
  border: 1px solid ${colors.light_gray};
  border-radius: 2px;
  font-weight: bold;
  font-size: 18px;
  box-sizing: initial;

  &:hover {
    color: ${colors.mermaid};
    border-color: ${colors.mermaid};
  }
`

const Tab = styled.div<{ selected: boolean, secondary: boolean }>`
  align-self: center;
  margin-right: 40px;
  cursor: pointer;
  color: ${props => (props.selected ? colors.dark_gray : colors.light_gray)};
  ${props =>
    props.selected ? `border-bottom: 2px solid ${colors.mermaid}` : ''};
  font-weight: 600;
  white-space: nowrap;
  padding-bottom: 2px;
  font-size: ${props => (props.secondary ? '15px' : '18px')};
`
