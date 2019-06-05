// @flow strict

import React, { Component } from 'react'
import { t } from 'ttag'

import { ModalHeader } from 'components'

export type Props = {|
  +closeView: () => void,
  +goToPrevStep: () => void,
  +openView: (string) => void,
  +params: {|
    +walletId: string,
  |},
  +data: string,
  +isLoading: boolean,
|}

const PRIVATE_KEY_LENGTH: number = 66
const PRIVATE_KEY_HALF_LENGTH: number = PRIVATE_KEY_LENGTH / 2

class WalletsBackupView extends Component<Props> {
  componentDidMount() {
    const {
      openView,
      params,
    } = this.props

    openView(params.walletId)
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  getData = (isMnemonic: boolean) => {
    const { data } = this.props

    if (isMnemonic) {
      return data
    }

    // we should split data on two lines if it is privateKey
    const firstLine: string = data.substr(0, PRIVATE_KEY_HALF_LENGTH)
    const secondLine: string = data.substr(PRIVATE_KEY_HALF_LENGTH)

    return `${firstLine} ${secondLine}`
  }

  render() {
    const {
      goToPrevStep,
      isLoading,
    } = this.props

    try {
      return (
        <div className='wallets-view -backup'>
          <ModalHeader
            onBack={goToPrevStep}
            color='white'
            title={t`Backup wallet`}
            isDisabled={isLoading}
          />
          <div className='content' />
        </div>
      )
    } catch (err) {
      console.error(err)

      return null
    }
  }
}

export default WalletsBackupView
