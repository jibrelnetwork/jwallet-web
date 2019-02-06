// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { JText, JIcon } from 'components/base'
import handle from 'utils/eventHandlers/handle'
import OverlayActions from 'components/OverlayActions'

type CopyableFieldHandler = (value: string) => void

type Props = {|
  +copy: CopyableFieldHandler,
  +download: ?CopyableFieldHandler,
  +value: string,
  +valueToDisplay: ?string,
|}

type StateProps = {|
  isSuccess: boolean,
|}

class CopyableField extends PureComponent<Props, StateProps> {
  static defaultProps = {
    download: null,
    valueToDisplay: null,
  }

  // eslint-disable-next-line react/sort-comp
  toggleTimeout: ?TimeoutID = null

  constructor(props: Props) {
    super(props)

    this.state = {
      isSuccess: false,
    }
  }

  onClick = (copy: CopyableFieldHandler, value: string) => {
    this.setState({ isSuccess: true })

    this.toggleTimeout = setTimeout(() => {
      this.setState({ isSuccess: false })
    }, 2000)

    return (copy)(value)
  }

  componentWillUnmount() {
    if (this.toglleTimeout) {
      clearTimeout(this.toggleTimeout)
    }
  }

  render() {
    const {
      copy,
      download,
      value,
      valueToDisplay,
    }: Props = this.props

    const {
      isSuccess,
    }: StateProps = this.state

    return (
      <div className={classNames('copyable-field', isSuccess && '-success')}>
        <div className='value'>
          <JText
            value={valueToDisplay || value}
            size='large'
            color='white'
            align='center'
            whiteSpace='wrap'
          />
        </div>
        <div className='overlay'>
          <OverlayActions
            // copy={handle(copy)(value)}
            copy={handle(this.onClick)(copy, value)}
            load={download ? handle(download)(value) : null}
            loadLabel='Download as TXT'
            copyLabel='Copy backup phrase'
          />
        </div>
        <div className='success'>
          <div className='icon'>
            <JIcon name='check-circle' color='white' size='medium' />
          </div>
          <div className='text'>
            <JText value='Copied!' color='white' weight='bold' />
          </div>
        </div>
      </div>
    )
  }
}

export default CopyableField
