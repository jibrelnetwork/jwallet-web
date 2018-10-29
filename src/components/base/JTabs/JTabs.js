// @flow

import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

const JTabs = ({ tabs }: Props) => (
  <div className='j-tabs'>
    {Object.keys(tabs).map((path: string) => (
      <Link
        key={path}
        to={path}
        activeClassName='-active'
        className={classNames('tab')}
      >
        {tabs[path]}
      </Link>
    ))}
  </div>
)

type Props = {
  tabs: { [string]: string }
}

export default JTabs
