// @flow

import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

const JTabs = ({ tabs, location }: Props) => (
  <ul className='j-tabs'>
    {Object.keys(tabs).map((path: string) => (
      <li key={path} className={classNames('tab', { '-active': (path === location.pathname) })}>
        <Link to={path} className='link'>{tabs[path]}</Link>
      </li>
    ))}
  </ul>
)

type Props = {
  tabs: { [string]: string },
  location: {
    pathname: string,
  },
}

export default JTabs
