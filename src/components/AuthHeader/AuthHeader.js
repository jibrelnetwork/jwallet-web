import React from 'react'

import { JHeader, JIcon } from 'components/base'

function AuthHeader() {
  return (
    <JHeader>
      <div className='clear'>
        <a href='/' className='header__back pull-right'>
          <JIcon name='convert' />{'Back to front page'}
        </a>
      </div>
    </JHeader>
  )
}

export default AuthHeader
