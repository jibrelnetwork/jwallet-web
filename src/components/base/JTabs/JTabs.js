// @flow

import React from 'react'

import { JLink } from 'components/base'

type Props = {|
  +tabs: { [string]: string },
|}

const JTabs = ({ tabs }: Props) => (
  <div className='j-tabs'>
    {Object.keys(tabs).map((path: string) => (
      <JLink
        key={path}
        href={path}
        activeClassName='-active'
        className='tab'
      >
        {tabs[path]}
      </JLink>
    ))}
  </div>
)

export default JTabs
