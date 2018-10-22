// @flow

import React, { PureComponent } from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import { JRaisedButton, JText } from 'components/base'

type Props = {|
  +onSubmit: Function,
  +title: ?Array<string>,
  +children: React$Node,
  +buttonLabel: string,
  +isLoading: boolean,
|}

class WalletStep extends PureComponent<Props> {
  static defaultProps = {
    title: null,
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
        {!!title && (
          <div className='title'>
            {title.map((line: string) => (
              <div className='string' key={line}>
                <JText size='large' color='white' value={line} whiteSpace='wrap' align='center' />
              </div>
            ))}
          </div>
        )}
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
