// @flow

import React from 'react'
import { Link } from 'react-router'

// @TODO: div inside <a> - not good

const JLogo = () => (
  <Link to='/' className='j-logo'>
    <div className='image' />
  </Link>
)

export default JLogo
