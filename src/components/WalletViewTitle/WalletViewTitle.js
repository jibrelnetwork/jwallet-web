// @flow

import React, { PureComponent } from 'react'

import JText from 'components/base/JText'

type Props = {|
  +data: ?string[],
|}

class WalletViewTitle extends PureComponent<Props> {
  static defaultProps = {
    data: null,
  }

  render() {
    const { data } = this.props

    if (!data) {
      return null
    }

    return (
      <div className='wallet-view-title'>
        {data.map((line: string) => (
          <div className='string' key={line}>
            <JText size='large' color='white' value={line} whiteSpace='wrap' align='center' />
          </div>
        ))}
      </div>
    )
  }
}

export default WalletViewTitle
