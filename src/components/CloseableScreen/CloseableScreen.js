// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import JText from 'components/base/JText'
import ESCButton from 'components/ESCButton'

type CloseableScreenHandler = () => void

type Props = {|
  +close: ?CloseableScreenHandler,
  +onOpen: ?CloseableScreenHandler,
  +onClose: ?CloseableScreenHandler,
  +children: React$Node,
  +title: string,
  +isCloseable: boolean,
|}

class CloseableScreen extends Component<Props> {
  static defaultProps = {
    close: null,
    onOpen: null,
    onClose: null,
    isCloseable: true,
  }

  componentDidMount() {
    if (this.props.onOpen) {
      this.props.onOpen()
    }
  }

  componentWillUnmount() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    const {
      close,
      children,
      title,
      isCloseable,
    } = this.props

    return (
      <div className='closeable-screen'>
        <div className='header'>
          <div className='container'>
            <JText
              value={title}
              color='gray'
              size='header'
            />
            <div className='actions'>
              {close && <ESCButton
                onESC={close}
                color='gray'
                iconName='padding-cross'
                isDisabled={!isCloseable}
              />}
            </div>
          </div>
        </div>
        <div className='content'>
          <Scrollbars autoHide>
            {children}
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default CloseableScreen
