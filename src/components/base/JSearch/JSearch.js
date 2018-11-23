// @flow

import classNames from 'classnames'
import React, { PureComponent }  from 'react'

import config from 'config'
import JIcon from 'components/base/JIcon'
import { handle, handleTargetValue } from 'utils/eventHandlers'

type Props = {|
  +onChange: (string) => void,
  +value: string,
  +placeholder: string,
|}

type ComponentState = {|
  +isActive: boolean,
  +value: string,
  +queryTimeout: ?TimeoutID,
|}

class JSearch extends PureComponent<Props, ComponentState> {
  static defaultProps = {
    placeholder: '',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      value: props.value,
      queryTimeout: null,
      isActive: false,
    }
  }

  onChange = (value: string) => {
    if (this.state.queryTimeout) {
      clearTimeout(this.state.queryTimeout)
    }

    const queryTimeout = setTimeout(this.props.onChange, config.searchTimeout, value)

    this.setState({
      value,
      queryTimeout,
    })
  }

  toggle = (isActive: boolean) => {
    this.setState({
      isActive,
      value: '',
    })

    if (!isActive) {
      if (this.state.queryTimeout) {
        clearTimeout(this.state.queryTimeout)
      }

      this.props.onChange('')
    }
  }

  render() {
    const {
      placeholder,
    } = this.props

    const {
      value,
      isActive,
    } = this.state

    return (
      <div className={classNames('j-search', isActive && '-active')}>
        <div onClick={handle(this.toggle)(!isActive)} className='search'>
          <JIcon size='medium' name='search' color='gray' />
        </div>
        <div className='field'>
          <input
            onChange={handleTargetValue(this.onChange)}
            value={value}
            placeholder={placeholder}
            type='text'
            className='input'
          />
          <div onClick={handle(this.toggle)(false)} className='close'>
            <JIcon size='medium' name='plus' color='gray' />
          </div>
        </div>
      </div>
    )
  }
}

export default JSearch
