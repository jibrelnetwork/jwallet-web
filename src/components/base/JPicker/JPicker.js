// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import handle from 'utils/eventHandlers/handle'

import {
  JIcon,
  JText,
} from 'components/base'

type RendererProps = {
  isOpen: boolean,
  isDisabled: boolean,
}

type Props = {|
  +onOpen: ?(() => void),
  +onClose: ?(() => void),
  +currentRenderer: ?((props: RendererProps) => React$Node),
  +bottomRenderer: ?((props: RendererProps) => React$Node),
  +children: ?React$Node,
  +isDisabled: boolean,
  +infoMessage: string,
  +errorMessage: string,
|}

type ComponentState = {|
  +isOpen: boolean,
|}

class JPicker extends PureComponent<Props, ComponentState> {
  static defaultProps = {
    onOpen: null,
    onClose: null,
    children: null,
    currentRenderer: null,
    bottomRenderer: null,
    isDisabled: false,
    infoMessage: '',
    errorMessage: '',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  toggle = (isOpen: boolean) => {
    const {
      onOpen,
      onClose,
    } = this.props

    this.setState(
      { isOpen },
      () => isOpen
        ? onOpen && onOpen()
        : onClose && onClose(),
    )
  }

  render() {
    const {
      children,
      currentRenderer,
      bottomRenderer,
      isDisabled,
      infoMessage,
      errorMessage,
    } = this.props

    const { isOpen } = this.state

    const currentEl = !currentRenderer ? null : currentRenderer({
      isOpen,
      isDisabled,
    })

    const bottomEl = !bottomRenderer ? null : bottomRenderer({
      isOpen,
      isDisabled,
    })

    const countClass = (React.Children.count(children) < 4)
      ? `-c${React.Children.count(children)}`
      : null

    return (
      <div
        className={classNames(
          'j-picker',
          isOpen && '-active',
          isDisabled && '-disabled',
          countClass,
        )}
      >
        <div className='select'>
          <div onClick={isDisabled ? undefined : handle(this.toggle)(!isOpen)} className='current'>
            {currentEl}
            <div className='chevron'>
              <JIcon name={isOpen ? 'chevron-up' : 'chevron-down'} color='blue' size='medium' />
            </div>
          </div>
          <div onClick={handle(this.toggle)(false)} className='options'>
            <div className='items'>
              <Scrollbars>
                {children}
              </Scrollbars>
            </div>
            {bottomEl && (
              <div className='bottom'>
                {bottomEl}
              </div>
            )}
          </div>
        </div>
        {isOpen && <div onClick={handle(this.toggle)(false)} className='overlay' />}
        {infoMessage && (
          <div className='info'>
            <JText value={infoMessage} color='orange' size='small' />
          </div>
        )}
        {errorMessage && (
          <div className='error'>
            <JText value={errorMessage} color='red' size='small' />
          </div>
        )}
      </div>
    )
  }
}

export default JPicker
