import React from 'react'

const files = require.context('../../public/assets/icons/new-pack/large', false, /.*\.svg$/)

files.keys().forEach(x => files(x))

const SvgIcon = ({ type, className }) => (
  <svg className={`${className}`} >
    <use xlinkHref={`#${type}`} />
  </svg>
)

export default SvgIcon
