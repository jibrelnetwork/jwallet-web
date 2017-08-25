import React from 'react'
import Link from 'react-toolbox/lib/link'

function Demo() {
  return (
    <nav>
      <Link active href="/#/list" label="Transactions"/>
      <Link href="/#/login" label="Login"/>
      <Link href="/#/settings" label="Setting" />
    </nav>
  )
}

export default Demo
