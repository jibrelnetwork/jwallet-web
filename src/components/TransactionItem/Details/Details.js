// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { assoc } from 'ramda'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import { JText, JIcon } from 'components/base'
import TransactionItemMessage from './Message'

type Props = {|
  +addFavorite: Function,
  +repeat: Function,
  +data: TransactionWithAssetAddress,
  +assetDecimals: number,
  +assetSymbol: string,
  +isActive: boolean,
|}

type StateProps = {|
  isMessage: boolean,
|}

const getTxLink = (txHash: Hash) => `${config.blockExplorerLink}/tx/${txHash}`

class TransactionItemDetails extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isMessage: false,
    }
  }

  toggleMessage = () => this.setState({ isMessage: !this.state.isMessage })

  render() {
    const {
      addFavorite,
      repeat,
      data,
      assetDecimals,
      assetSymbol,
      isActive,
    } = this.props

    const {
      isMessage,
    }: StateProps = this.state

    const fee = ((data.receiptData.gasUsed * data.data.gasPrice) / (10 ** assetDecimals))

    return (
      <div className={classNames('transaction-item-details', isActive && '-active')}>
        <div className='item'>
          <div className='label'>
            <JText value='Tx hash' color='gray' />
          </div>
          <div className='value'>
            <a
              href={getTxLink(data.hash)}
              target='_blank'
              className='link'
              rel='noopener noreferrer'
            >
              {data.hash}
            </a>
          </div>
        </div>
        <div className='item -small-width'>
          <div className='label'>
            <JText value='From address' color='gray' />
          </div>
          <div className='value'>
            <a
              href={getTxLink(data.from)}
              target='_blank'
              className='link'
              rel='noopener noreferrer'
            >
              {data.from}
            </a>
          </div>
        </div>
        <div className='item -small-width'>
          <div className='label'>
            <JText value='To address' color='gray' />
          </div>
          <div className='value'>
            <a
              href={getTxLink(data.to)}
              target='_blank'
              className='link'
              rel='noopener noreferrer'
            >
              {data.to}
            </a>
          </div>
        </div>
        <div className='item'>
          <div className='label'>
            <JText value='Fee' color='gray' />
          </div>
          <div className='value'>
            <JText value={`${fee} ${assetSymbol}`} color='gray' />
          </div>
        </div>
        <div className='actions'>
          <div className='action' onClick={handle(repeat)(assoc('symbol', assetSymbol)(data))}>
            <div className='icon'>
              <JIcon size='medium' color='gray' name='repeat' />
            </div>
            <div className='text'>
              <JText value='Repeat payment' color='gray' size='normal' />
            </div>
          </div>
          <div className='action' onClick={addFavorite}>
            <div className='icon'>
              <JIcon size='medium' color='gray' name='star-add' />
            </div>
            <div className='text'>
              <JText value='Add to favourites' color='gray' size='normal' />
            </div>
          </div>
          <div className='action' onClick={this.toggleMessage}>
            <div className='icon'>
              <JIcon size='medium' color='gray' name='message-add' />
            </div>
            <div className='text'>
              <JText value='Add comment' color='gray' size='normal' />
            </div>
          </div>
        </div>
        {isMessage && (
          <TransactionItemMessage
            saveMessage={this.toggleMessage}
            deleteMessage={this.toggleMessage}
          />
        )}
      </div>
    )
  }
}

export default TransactionItemDetails
