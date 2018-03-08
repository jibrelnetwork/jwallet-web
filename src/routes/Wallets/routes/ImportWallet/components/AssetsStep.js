// @flow

import React from 'react'
import { Link } from 'react-router'

const AssetsStep = () => (
  <div className='import-wallet-assets-step'>
    <div>{'Popular assets'}</div>
    <Link to='/'>{i18n('routes.importWallet.buttonTitle.finish')}</Link>
  </div>
)

export default AssetsStep
