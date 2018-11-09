// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { JText } from 'components/base'
import ESCButton from '../ESCButton'

type Props = {
  title: string,
  children: React$Node,
  allowClose: boolean,
  open: (() => void),
  close: (() => void),
  closeClick: (() => void),
}

class CloseableScreen extends Component<Props> {
  static defaultProps = {
    open: null,
    close: null,
    closeClick: null,
    allowClose: true,
  }

  componentDidMount() {
    if (this.props.open) {
      this.props.open()
    }
  }

  componentWillUnmount() {
    if (this.props.close) {
      this.props.close()
    }
  }

  render() {
    const {
      title,
      children,
      closeClick,
      allowClose,
    } = this.props

    return (
      <div className='closeable-screen'>
        <div className='header'>
          <JText value={title} />
          <div className='actions'>
            {closeClick && <ESCButton
              onESC={closeClick}
              color='gray'
              iconName='padding-cross'
              isDisabled={!allowClose}
            />}
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
