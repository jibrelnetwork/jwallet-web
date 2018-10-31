// @flow

import React, { PureComponent, Fragment } from 'react'

import { JIcon, JText } from 'components/base'
import handle from 'utils/eventHandlers/handle'

type Props = {
  +icon: string,
  +informer: number,
}

type ComponentState = {|
  +isActive: boolean,
|}

class PopupButton extends PureComponent<Props, ComponentState> {
  static defaultProps = {
    isActive: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isActive: false,
    }
  }

  toggle = (isActive: boolean) => {
    this.setState({
      isActive,
    })
  }

  render() {
    const {
      icon,
      informer,
    } = this.props

    const {
      isActive,
    } = this.state

    return (
      <div className='popup-button' >
        {informer && (
          <div className='informer'>
            <JText value={informer} size='small' color='white' weight='bold' />
          </div>
        )}
        <div className='icon' onClick={handle(this.toggle)(!isActive)}>
          <JIcon size='medium' color='gray' name={icon} />
        </div>
        {isActive && (
          <Fragment>
            <div className='overlay' onClick={handle(this.toggle)(!isActive)} />
            <div className='close' onClick={handle(this.toggle)(!isActive)}>
              <JIcon size='medium' color='gray' name='cross' />
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default PopupButton
