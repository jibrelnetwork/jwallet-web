// @flow

import React, { PureComponent } from 'react'

import { JIcon, JFlatButton } from 'components/base'

type Props = {
  saveMessage: () => void,
  deleteMessage: () => void,
}

class TransactionItemMessage extends PureComponent<Props> {
  render() {
    const {
      saveMessage,
      deleteMessage,
    } = this.props

    return (
      <div className='transaction-item-message'>
        <label htmlFor='message' className='icon'>
          <JIcon size='medium' color='gray' name='message-add' />
        </label>

        <input type='text' id='message' className='field' placeholder='Your comment' />

        <div className='actions'>
          <div className='button'>
            <JFlatButton
              onClick={saveMessage}
              label='Save'
              color='blue'
              isBordered
            />
          </div>
          <div className='button'>
            <JFlatButton
              onClick={deleteMessage}
              label='Delete'
              color='blue'
              isBordered
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TransactionItemMessage
