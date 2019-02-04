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
  title?: string,
|}

type ComponentState = {|
  +searchInputRef: React$ElementRef<any>,
  +value: string,
  +queryTimeout: ?TimeoutID,
  +isActive: boolean,
|}

class JSearch extends PureComponent<Props, ComponentState> {
  static defaultProps = {
    value: '',
    placeholder: '',
    title: 'Search',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      searchInputRef: React.createRef(),
      value: props.value,
      queryTimeout: null,
      isActive: false,
    }
  }

  componentWillUnmount() {
    // FIXME
    this.onChange('')
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

    const {
      searchInputRef,
      queryTimeout,
    } = this.state

    if (isActive) {
      searchInputRef.current.focus()
    } else {
      if (queryTimeout) {
        clearTimeout(queryTimeout)
      }

      this.props.onChange('')
    }
  }

  render() {
    const {
      placeholder,
      title,
    } = this.props

    const {
      searchInputRef,
      value,
      isActive,
    } = this.state

    return (
      <div className={classNames('j-search', isActive && '-active')}>
        <div onClick={handle(this.toggle)(!isActive)} className='search' title={title}>
          <JIcon size='medium' name='search' color='gray' />
        </div>
        <div className='field'>
          <input
            onChange={handleTargetValue(this.onChange)}
            ref={searchInputRef}
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
