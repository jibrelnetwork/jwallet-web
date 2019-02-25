// @flow

import React from 'react'

import { Link } from 'react-router'

type Props = {|
  +tabs: { [string]: string },
|}

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

export default JTabs
