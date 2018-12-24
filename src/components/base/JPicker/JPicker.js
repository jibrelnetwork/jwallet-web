// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import handle from 'utils/eventHandlers/handle'
import { JIcon } from 'components/base'

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
  isOpen: boolean,
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
    const { onOpen, onClose } = this.props

    this.setState(
      { isOpen },
      () => isOpen
        ? onOpen && onOpen()
        : onClose && onClose()
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

    const currentEl = currentRenderer
      ? currentRenderer({ isOpen, isDisabled })
      : null

    const bottomEl = bottomRenderer
      ? bottomRenderer({ isOpen, isDisabled })
      : null

    const countClass = (React.Children.count(children) < 4)
      ? `-c${React.Children.count(children)}`
      : null

    return (
      <div
        className={classNames(
          'j-picker',
          isOpen && '-active',
          isDisabled && '-disabled',
          countClass
        )}
      >
        <div onClick={isDisabled ? undefined : handle(this.toggle)(!isOpen)} className='current'>
          {currentEl}
          <div className='chevron'>
            <JIcon name={isOpen ? 'chevron-up' : 'chevron-down'} color='blue' size='medium' />
          </div>
        </div>
        <div onClick={handle(this.toggle)(false)} className='options'>
          <Scrollbars>
            {children}
          </Scrollbars>
        </div>
        {bottomEl &&
          <div className='bottom'>
            {bottomEl}
          </div>}
        {isOpen && <div onClick={handle(this.toggle)(false)} className='overlay' />}
        {infoMessage && <div className='info'>{infoMessage}</div>}
        {errorMessage && <div className='error'>{errorMessage}</div>}
      </div>
    )
  }
}

export default JPicker
