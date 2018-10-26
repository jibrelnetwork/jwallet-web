// @flow

import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

const JTabs = ({ tabs, location }: Props) => (
  <div className='j-tabs'>
    {Object.keys(tabs).map((path: string) => (
      <Link
        key={path}
        to={path}
        className={classNames('tab', { '-active': (path === location.pathname) })}
      >
        {tabs[path]}
      </Link>
    ))}
  </div>
)

type Props = {
  tabs: { [string]: string },
  location: {
    pathname: string,
  },
}

export default JTabs
