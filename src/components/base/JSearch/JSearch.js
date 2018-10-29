// @flow

import React, { PureComponent }  from 'react'
import classNames from 'classnames'

import JIcon from 'components/base/JIcon'
import handle from 'utils/eventHandlers/handle'

type Props = {|
  +onToggle: Function,
  +onQueryChange: Function,
  +query: string,
  +placeholder: string,
  +isActive: boolean,
|}

class JSearch extends PureComponent<Props> {
  static defaultProps = {
    isActive: false,
  }

  render() {
    const {
      onToggle,
      onQueryChange,
      query,
      placeholder,
      isActive,
    } = this.props

    return (
      <div className={classNames('j-search', isActive && '-active', query && '-value')}>
        <div onClick={handle(onToggle)(!isActive)} className='search'>
          <JIcon size='medium' name='search' color='gray' />
        </div>
        <div className='field'>
          <input
            onChange={onQueryChange}
            value={query}
            placeholder={placeholder}
            type='text'
            className='input'
          />
          <div onClick={handle(onToggle)(false)} className='close'>
            <JIcon size='medium' name='plus' color='gray' />
          </div>
        </div>
      </div>
    )
  }
}
export default JSearch
