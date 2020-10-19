// Lib
import React from 'react'

// Icons
import { ReactComponent as Alert } from './icons/alert.svg'
import { ReactComponent as BWIcon } from './icons/bwIcon.svg'
import { ReactComponent as BWLogo } from './icons/bwLogo.svg'
import { ReactComponent as Calendar } from './icons/calendar.svg'
import { ReactComponent as Categories } from './icons/categories.svg'
import { ReactComponent as Cog } from './icons/cog.svg'
import { ReactComponent as Cross } from './icons/cross.svg'
import { ReactComponent as Download } from './icons/download.svg'
import { ReactComponent as Info } from './icons/info.svg'
import { ReactComponent as InfoActive } from './icons/infoActive.svg'
import { ReactComponent as Refresh } from './icons/refresh.svg'
import { ReactComponent as Trash } from './icons/trash.svg'
import { ReactComponent as Tv } from './icons/tv.svg'
import { ReactComponent as Pencil } from './icons/pencil.svg'
import { ReactComponent as Notebook } from './icons/notebook.svg'
import { ReactComponent as Plus } from './icons/plus.svg'
import { ReactComponent as Fine } from './icons/fine.svg'
import { ReactComponent as Error } from './icons/error.svg'
// Social
import { ReactComponent as Twitter } from './icons/twitter.svg'
import { ReactComponent as Facebook } from './icons/facebook.svg'
import { ReactComponent as Instagram } from './icons/instagram.svg'
import { ReactComponent as Youtube } from './icons/youtube.svg'
import { ReactComponent as Media } from './icons/media.svg'
import { ReactComponent as Gmb } from './icons/gmb.svg'

// Special icons
import AddButton from './icons/addButton'
import Pulse from './icons/pulse'

// Select arrow icons which are colored for that use
import { ReactComponent as UpArrow } from './icons/up.svg'
import { ReactComponent as DownArrow } from './icons/down.svg'


// Styles
import './Icon.scss'

export enum Icons {
  Annotate = 'Annotate',
  Alert = 'Alert',
  BWIcon = 'BWIcon',
  BWLogo = 'BWLogo',
  Calendar = 'Calendar',
  Categories = 'Categories',
  Config = 'Config',
  Cross = 'Cross',
  Download = 'Download',
  Edit = 'Edit',
  Gmb = 'Gmb',
  Info = 'Info',
  InfoActive = 'InfoActive',
  Media = 'Media',
  Pulse = 'Pulse',
  Remove = 'Remove',
  Refresh = 'Refresh',
  Tv = 'Tv',
  UpArrow = 'UpArrow',
  DownArrow = 'DownArrow',
  Add = 'Add',
  Plus = 'Plus',
  Fine = 'Fine',
  Error = 'Error',
  Twitter = 'Twitter',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Youtube = 'Youtube'
}

const SPECIAL_ICONS = {
  [Icons.Add]: <AddButton />,
  [Icons.Pulse]: <Pulse />,
}

export enum IconColors {
  Positive = 'positive',
  Negative = 'negative',
  Neutral = 'neutral',
  Original = 'original',
  White = 'white'
}


export enum IconSizes {
  Medium = 'medium',
  Small = 'small',
  Original = 'original'
}

// State and props
interface Props {
  // The icon we want to display
  icon: Icons

  // Color
  color?: IconColors

  // Size
  size?: IconSizes

  // Is the button disable
  disabled?: boolean
}

// //
// Component
// //
function Icon(props: Props) {
  const {
    icon,
    color = IconColors.Positive,
    size = IconSizes.Medium,
    disabled = false
  } = props

  if (SPECIAL_ICONS[icon]) {
    return SPECIAL_ICONS[icon]
  } else {
    const DomIcon = getIcon(icon)

    return (
      <DomIcon className={`react-icon icon-color_${color} icon-size_${size} ${disabled ? 'icon--disabled' : ''}`}></DomIcon>
    )
  }


}

export default Icon

// //
// Aux functions
// //
function getIcon(iconName: string) {
  switch (iconName) {
    case Icons.Annotate:
      return Notebook
    case Icons.Alert:
      return Alert
    case Icons.BWIcon:
      return BWIcon
    case Icons.BWLogo:
      return BWLogo
    case Icons.Calendar:
      return Calendar
    case Icons.Config:
      return Cog
    case Icons.Cross:
      return Cross
    case Icons.Download:
      return Download
    case Icons.Edit:
      return Pencil
    case Icons.Remove:
      return Trash
    case Icons.Refresh:
      return Refresh
    case Icons.Categories:
      return Categories
    case Icons.Tv:
      return Tv
    case Icons.UpArrow:
      return UpArrow
    case Icons.DownArrow:
      return DownArrow
    case Icons.Plus:
      return Plus
    case Icons.Twitter:
      return Twitter
    case Icons.Facebook:
      return Facebook
    case Icons.Instagram:
      return Instagram
    case Icons.Youtube:
      return Youtube
    case Icons.Media:
      return Media
    case Icons.Fine:
      return Fine
    case Icons.Error:
      return Error
    case Icons.Gmb:
      return Gmb
    case Icons.Info:
      return Info
    case Icons.InfoActive:
      return InfoActive
  }

  return Alert
}


