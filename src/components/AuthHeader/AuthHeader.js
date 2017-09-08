import React from 'react'

import { JbHeader, JbIcon } from 'components/base'

function AuthHeader() {
  return (
    <JbHeader>
      <div className='clear'>
        <a href='/' className='header__back pull-right'>
          <JbIcon name='convert' />{'Back to front page'}
        </a>
      </div>
    </JbHeader>
  )
}

export default AuthHeader
