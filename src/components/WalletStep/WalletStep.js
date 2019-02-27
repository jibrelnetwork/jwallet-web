// @flow

import React, { PureComponent } from 'react'

import WalletViewTitle from 'components/WalletViewTitle'
import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import JRaisedButton from 'components/base/JRaisedButton'

type Props = {|
  +onSubmit: Function,
  +title: ?string[],
  +children: React$Node,
  +buttonLabel: string,
  +isLoading: boolean,
|}

class WalletStep extends PureComponent<Props> {
  static defaultProps = {
    title: null,
    isLoading: false,
  }

  render() {
    const {
      onSubmit,
      title,
      children,
      buttonLabel,
      isLoading,
    } = this.props

    return (
      <div className='wallet-step'>
        <WalletViewTitle data={title} />
        <form className='form' onSubmit={ignoreEvent(isLoading ? null : onSubmit)()}>
          {children}
          <div className='actions'>
            <JRaisedButton
              onClick={onSubmit}
              label={buttonLabel}
              color='white'
              labelColor='blue'
              loaderColor='white'
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default WalletStep
