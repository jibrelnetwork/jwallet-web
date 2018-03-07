// @flow

import React from 'react'
import { Link } from 'react-router'

const Assets = () => (
  <div className='import-wallet-step-assets'>
    <div>{'Popular assets'}</div>
    <Link to='/'>{i18n('routes.importWallet.buttonTitle.finish')}</Link>
  </div>
)

export default Assets
