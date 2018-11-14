// @flow

import React, { PureComponent, Fragment } from 'react'

import { JIcon, JText } from 'components/base'
import handle from 'utils/eventHandlers/handle'

type Props = {
  +children: React$Node,
  +icon: string,
  +counter: number,
}

type ComponentState = {|
  isActive: boolean,
|}

class PopupButton extends PureComponent<Props, ComponentState> {
  static defaultProps = {
    counter: 0,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isActive: false,
    }
  }

  toggle = (isActive: boolean) => { this.setState({ isActive }) }

  render() {
    const {
      children,
      icon,
      counter,
    } = this.props

    const {
      isActive,
    } = this.state

    return (
      <div className='popup-button' >
        {!!counter && (
          <div className='counter'>
            <JText value={counter.toString()} size='small' color='white' weight='bold' />
          </div>
        )}
        <div className='icon' onClick={handle(this.toggle)(!isActive)}>
          <JIcon size='medium' color='gray' name={icon} />
        </div>
        {isActive && (
          <Fragment>
            <div className='overlay' onClick={handle(this.toggle)(!isActive)} />
            <div className='close' onClick={handle(this.toggle)(!isActive)}>
              <JIcon size='medium' color='gray' name='close-padding' />
            </div>
            <div className='container'>
              {children}
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default PopupButton
