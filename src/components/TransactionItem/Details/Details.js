// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import { JText, JFlatButton } from 'components/base'
import TransactionItemDetailsComment from './Comment'

type Props = {|
  +repeat: () => void,
  +addFavorite: () => void,
  +data: TransactionWithAssetAddress,
  +assetDecimals: number,
  +isActive: boolean,
|}

type StateProps = {|
  isCommenting: boolean,
|}

const getTxLink = (txHash: Hash) => `${config.blockExplorerLink}/tx/${txHash}`

class TransactionItemDetails extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isCommenting: false,
    }
  }

  toggle = () => this.setState({ isCommenting: !this.state.isCommenting })

  render() {
    const {
      repeat,
      addFavorite,
      data,
      assetDecimals,
      isActive,
    } = this.props

    const {
      isCommenting,
    }: StateProps = this.state

    const fee = ((data.receiptData.gasUsed * data.data.gasPrice) / (10 ** assetDecimals))

    return (
      <div className={classNames('transaction-item-details', isActive && '-active')}>
        <div className='item'>
          <div className='label'>
            <JText value='TX Hash' color='gray' />
          </div>
          <div className='value'>
            <a
              href={getTxLink(data.hash)}
              target='_blank'
              className='link'
              rel='noopener noreferrer'
            >
              <JText value={data.hash} color='blue' />
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
              <JText value={data.from} color='blue' />
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
              <JText value={data.to} color='blue' />
            </a>
          </div>
        </div>
        <div className='item'>
          <div className='label'>
            <JText value='Fee' color='gray' />
          </div>
          <div className='value'>
            <JText value={`${fee} ETH`} color='gray' />
          </div>
        </div>
        <div className='actions'>
          <div className='action'>
            <JFlatButton
              onClick={handle(repeat)}
              iconSize='medium'
              label='Repeat payment'
              iconColor='gray'
              color='gray'
              iconName='repeat'
            />
          </div>
          <div className='action'>
            <JFlatButton
              onClick={addFavorite}
              iconSize='medium'
              label='Add to favourites'
              iconColor='gray'
              color='gray'
              iconName='star-add'
            />
          </div>
          <div className='action'>
            <JFlatButton
              onClick={this.toggle}
              iconSize='medium'
              label='Add comment'
              iconColor='gray'
              color='gray'
              iconName='message-add'
            />
          </div>
        </div>
        {isCommenting && (
          <TransactionItemDetailsComment
            saveComment={this.toggle}
            deleteComment={this.toggle}
          />
        )}
      </div>
    )
  }
}

export default TransactionItemDetails
