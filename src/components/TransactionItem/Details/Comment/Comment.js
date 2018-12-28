// @flow

import React, { Component } from 'react'

import {
  handle,
  handleTargetValue,
} from 'utils/eventHandlers'

import {
  JIcon,
  JFlatButton,
} from 'components/base'

type Props = {|
  +toggle: () => void,
  +edit: (CommentId, string) => void,
  +comment: ?string,
  +transactionId: TransactionId,
|}

type ComponentState = {|
  +newValue: string,
|}

class TransactionItemDetailsComment extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    const { comment }: Props = props

    this.state = {
      newValue: comment || '',
    }
  }

  saveComment = (value: string) => {
    const {
      edit,
      toggle,
      transactionId,
    }: Props = this.props

    edit(transactionId, value)
    toggle()
  }

  deleteComment = () => this.saveComment('')

  changeValue = (newValue: string) => {
    this.setState({ newValue })
  }

  render() {
    const {
      toggle,
      comment,
    } = this.props

    const { newValue }: ComponentState = this.state
    const isValueChanged: boolean = (comment !== newValue)

    return (
      <div className='transaction-item-details-comment'>
        <label htmlFor='message' className='icon'>
          <JIcon size='medium' color='gray' name='message-add' />
        </label>
        <input
          onChange={handleTargetValue(this.changeValue)}
          value={newValue}
          type='text'
          id='message'
          className='field'
          placeholder='Your comment'
        />
        <div className='actions'>
          <div className='button'>
            <JFlatButton
              onClick={handle(this.saveComment)(newValue)}
              label='Save'
              color='blue'
              isBordered
            />
          </div>
          <div className='button'>
            <JFlatButton
              onClick={isValueChanged ? toggle : this.deleteComment}
              label={isValueChanged ? 'Cancel' : 'Delete'}
              color='blue'
              isBordered
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TransactionItemDetailsComment
