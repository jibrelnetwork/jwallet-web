// @flow strict

import React, { Component } from 'react'

import { TitleHeader } from 'components'

type CloseableScreenHandler = () => void

type Props = {|
  +onOpen: ?CloseableScreenHandler,
  +onClose: ?CloseableScreenHandler,
  +children: React$Node,
  +title: string,
|}

export class CloseableScreen extends Component<Props> {
  static defaultProps = {
    onOpen: null,
    onClose: null,
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
      children,
      title,
    }: Props = this.props

    return (
      <div className='closeable-screen'>
        <TitleHeader title={title} />
        <div className='content'>
          {children}
        </div>
      </div>
    )
  }
}
