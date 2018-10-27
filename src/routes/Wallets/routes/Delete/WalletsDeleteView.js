// @flow

import React, { Component, Fragment } from 'react'

import ModalHeader from 'components/ModalHeader'
import { JThumbnail, JFlatButton } from 'components/base'

type Props = {|
  +closeView: () => void,
  +goToWallets: () => void,
  +openView: (string) => void,
  +remove: (Wallets, string) => void,
  +items: Wallets,
  +params: {|
    +walletId: string,
  |},
|}

type ComponentState = {|
  name: ?string,
  countdown: number,
  intervalId: ?IntervalID,
  isDeleteInitialised: boolean,
|}

const ONE_SECOND: 1000 = 1000
const DEFAULT_COUNTDOWN_SECONDS = 30

class WalletsDeleteView extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      name: this.getWalletName(props),
      intervalId: null,
      countdown: DEFAULT_COUNTDOWN_SECONDS,
      isDeleteInitialised: false,
    }
  }

  componentDidMount() {
    const { openView, params } = this.props
    openView(params.walletId)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { name } = this.state
    const nameNew = this.getWalletName(nextProps)

    if (name !== nameNew) {
      this.setState({ name: nameNew })
    }
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  getWalletName = (props: Props): ?string => {
    const { items, params } = props
    const foundWallet = items.find((w: Wallet): boolean => (w.id === params.walletId))

    return foundWallet ? foundWallet.name : null
  }

  setIntervalId = (intervalId: ?IntervalID) => {
    this.setState({ intervalId })
  }

  setCountdown = (countdown: number) => {
    if (countdown < 0) {
      this.finishCountdown()
    } else {
      this.setState({ countdown })
    }
  }

  startCountdown = () => {
    const intervalId: IntervalID = setInterval(() => {
      this.setCountdown(this.state.countdown - 1)
    }, ONE_SECOND)

    this.setIntervalId(intervalId)
  }

  finishCountdown = () => {
    const { intervalId } = this.state

    if (intervalId) {
      clearInterval(intervalId)
      this.setIntervalId(null)
    }
  }

  resetCountdown = () => {
    this.finishCountdown()
    this.setCountdown(DEFAULT_COUNTDOWN_SECONDS)
  }

  initDelete = () => {
    this.setState({ isDeleteInitialised: true })
    this.startCountdown()
  }

  cancelDelete = () => {
    this.setState({ isDeleteInitialised: false })
    this.resetCountdown()
  }

  confirmDelete = () => {
    const { remove, items, params } = this.props
    remove(items, params.walletId)
  }

  render() {
    const { goToWallets } = this.props
    const { name, countdown, isDeleteInitialised } = this.state

    if (!name) {
      return null
    }

    return (
      <div className='wallets-view -delete'>
        <ModalHeader
          onBack={goToWallets}
          color='white'
          title='Delete wallet'
        />
        <div className='content'>
          <div className='form'>
            <JThumbnail
              color='white'
              image='auth-cross'
              title={`Delete ${name}?`}
              description={[
                'All user data, including imported or generated private keys, will be deleted.',
                'The only way to restore deleted wallet is to use the backup phrase.',
              ]}
            />
            <div className='actions'>
              {isDeleteInitialised ? (
                <Fragment>
                  <JFlatButton
                    onClick={this.cancelDelete}
                    color='white'
                    label='Nope, stop it'
                    isBordered
                  />
                  <div className='confirm'>
                    <JFlatButton
                      onClick={this.confirmDelete}
                      label={(countdown > 0) ? `Yes – ${countdown} sec` : 'Yes'}
                      color='white'
                      isDisabled={countdown > 0}
                      isBordered
                    />
                  </div>
                </Fragment>
              ) : (
                <JFlatButton
                  onClick={this.initDelete}
                  color='white'
                  label='Yes, delete'
                  isBordered
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WalletsDeleteView
