// @flow

import React from 'react'

import { Link } from 'react-router'

const JTabs = ({ tabs }: Props) => (
  <div className='j-tabs'>
    {Object.keys(tabs).map((path: string) => (
      <Link
        key={path}
        to={path}
        activeClassName='-active'
        className='tab'
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
