// @flow strict

import React, { Component } from 'react'

import { About } from './components/About/About'
import { Transfers } from './components/Transfers/Transfers'

type Props = {|
  +assetId: string,
|}

type StateProps = {|
  +isTransfersHeaderScrolled: boolean,
|}

export class AssetsItem extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isTransfersHeaderScrolled: false,
    }
  }

  handleTransfersHeaderScroll = (isScrolled: boolean) => {
    this.setState({ isTransfersHeaderScrolled: isScrolled })
  }

  render() {
    const { assetId }: Props = this.props
    const { isTransfersHeaderScrolled }: StateProps = this.state

    return (
      <>
        <About
          assetId={assetId}
          isHeaderScrolled={isTransfersHeaderScrolled ? false : null}
        />
        <Transfers
          onHeaderScroll={this.handleTransfersHeaderScroll}
          assetId={assetId}
        />
      </>
    )
  }
}
